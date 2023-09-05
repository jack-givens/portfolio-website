terraform {
  backend "s3" {
    bucket     = "hvn-terraform-state"
    key        = "state/terraform.tfstate"
    region     = var.region
    access_key = var.access_key
    secret_key = var.secret_key
  }
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }

  required_version = "~> 1.0"
}

provider "aws" {
  region     = var.region
  access_key = var.access_key
  secret_key = var.secret_key

  default_tags {
    tags = {
      environment = "production"
      manager     = "terraform"
      project     = "${var.domain}"
    }
  }
}