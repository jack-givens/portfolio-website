# S3 bucket config (excluding permissions)
resource "aws_s3_bucket" "site" {
  bucket = "hvn-${var.domain}"
}
resource "aws_s3_bucket_ownership_controls" "site" {
  bucket = aws_s3_bucket.site.id
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}
resource "aws_s3_bucket_acl" "site" {
  depends_on = [aws_s3_bucket_ownership_controls.site]
  bucket = aws_s3_bucket.site.id
  acl = "private"
}
resource "aws_s3_bucket_versioning" "site" {
  bucket = aws_s3_bucket.site.id
  versioning_configuration {
    status = "Disabled"
  }
}
resource "aws_s3_bucket_website_configuration" "site" {
  bucket = aws_s3_bucket.site.id
  index_document {
    suffix = "index.html"
  }
}
output "s3_endpoint" {
  value = aws_s3_bucket.site.website_endpoint
}

# Cloudfront config
resource "aws_cloudfront_origin_access_identity" "oai" {
  comment = "OAI for ${var.domain}"
}
resource "aws_cloudfront_distribution" "cdn" {
  aliases = ["${var.domain}"]
  enabled = true
  is_ipv6_enabled = true
  default_root_object = "index.html"
  price_class = "PriceClass_100"
  origin {
    origin_id = "${var.domain}"
    domain_name = aws_s3_bucket.site.bucket_regional_domain_name

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.oai.cloudfront_access_identity_path
    }
  }
  custom_error_response {
    error_code = 403
    response_code = 200
    response_page_path = "/index.html"
  }
  custom_error_response {
    error_code = 404
    response_code = 200
    response_page_path = "/index.html"
  }
  default_cache_behavior {
    allowed_methods = ["GET", "HEAD", "OPTIONS"]
    cached_methods = ["GET", "HEAD", "OPTIONS"]
    target_origin_id = "${var.domain}"
    viewer_protocol_policy = "redirect-to-https"
    min_ttl = 0
    default_ttl = 3600
    compress = true
    max_ttl = 86400
    forwarded_values {
      query_string = true
      cookies {
        forward = "none"
      }
    }
  }
  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }
  viewer_certificate {
    acm_certificate_arn = aws_acm_certificate.cert_request.arn
    ssl_support_method = "sni-only"
    minimum_protocol_version = "TLSv1"
  }
  depends_on = [
    aws_s3_bucket.site
  ]
}
output "cdn_domain" {
  value = aws_cloudfront_distribution.cdn.domain_name
}
output "cloudfront_distribution" {
  value = aws_cloudfront_distribution.cdn.id
}

# S3 Bucket Permissions Config
# This essentially blocks users from accessing files directly from S3, and instead forces access through cloudfront
data "aws_iam_policy_document" "s3_policy" {
  statement {
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.site.arn}/*"]
    principals {
      type        = "AWS"
      identifiers = [aws_cloudfront_origin_access_identity.oai.iam_arn]
    }
  }
  depends_on = [
    aws_cloudfront_origin_access_identity.oai
  ]
}
resource "aws_s3_bucket_policy" "site" {
  bucket = aws_s3_bucket.site.id
  policy = data.aws_iam_policy_document.s3_policy.json
  depends_on = [
    data.aws_iam_policy_document.s3_policy
  ]
}
resource "aws_s3_bucket_public_access_block" "site" {
  bucket = aws_s3_bucket.site.id
  block_public_acls       = true
  block_public_policy     = true
}

# Route53 config
resource "aws_route53_zone" "main" {
  name = "${var.domain}"
}
resource "aws_route53_record" "root_domain" {
  zone_id = aws_route53_zone.main.zone_id
  name = "${var.domain}"
  type = "A"
  alias {
    name = aws_cloudfront_distribution.cdn.domain_name
    zone_id = aws_cloudfront_distribution.cdn.hosted_zone_id
    evaluate_target_health = false
  }
}
output "route53_domain" {
  value = aws_route53_record.root_domain.fqdn
}

# SSL setup
resource "aws_acm_certificate" "cert_request" {
  domain_name = "${var.domain}"
  subject_alternative_names = ["*.${var.domain}"]
  validation_method = "DNS"
  lifecycle {
    create_before_destroy = true
  }
}
resource "aws_route53_record" "records" {
  zone_id = aws_route53_zone.main.zone_id
  ttl = 60
  for_each = {
    for dvo in aws_acm_certificate.cert_request.domain_validation_options: dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }
  allow_overwrite = true
  name = each.value.name
  records = [each.value.record]
  type = each.value.type
}
resource "aws_acm_certificate_validation" "validation" {
  certificate_arn = aws_acm_certificate.cert_request.arn
  validation_record_fqdns = [for record in aws_route53_record.records: record.fqdn]
}