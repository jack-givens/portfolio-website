variable "access_key" {
  sensitive = true
  type      = string
}
variable "secret_key" {
  sensitive = true
  type      = string
}
variable "region" {
  description = "aws region"
  type        = string
  default     = "us-east-1"
}
variable "domain" {
  type    = string
  default = "jackgivens.dev"
}