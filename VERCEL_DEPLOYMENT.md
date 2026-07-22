# Vercel Deployment Guide

This file explains how to deploy the portfolio project to Vercel in a clean and understandable way.

## Project Type

This is a `Next.js 14` application using the App Router, so Vercel can deploy it directly without extra configuration.

## Before You Deploy

Make sure these things are ready:

- the project builds successfully locally
- your code is pushed to GitHub
- you have a Vercel account
- you have a Resend account if you want the contact form to send emails

## Required Environment Variables

Add these variables in Vercel before or after import:

```env
RESEND_API_KEY=your_resend_api_key
CONTACT_FROM_EMAIL=Portfolio <onboarding@resend.dev>
CONTACT_TO_EMAIL=awaismustafavhr@gmail.com
```

## Deployment Method 1: Deploy From GitHub

This is the easiest and recommended method.

### Step 1

Push your code to GitHub.

### Step 2

Open [https://vercel.com](https://vercel.com) and sign in.

### Step 3

Click `Add New` -> `Project`.

### Step 4

Import this repository from GitHub.

### Step 5

When Vercel detects the framework, it should automatically recognize:

- Framework Preset: `Next.js`
- Build Command: `next build`
- Output Directory: leave default
- Install Command: `npm install`

### Step 6

Open the `Environment Variables` section and add:

- `RESEND_API_KEY`
- `CONTACT_FROM_EMAIL`
- `CONTACT_TO_EMAIL`

### Step 7

Click `Deploy`.

## Deployment Method 2: Vercel CLI

If you want to deploy from your terminal:

### Install Vercel CLI

```bash
npm install -g vercel
```

### Login

```bash
vercel login
```

### Run deployment

```bash
vercel
```

For production deployment:

```bash
vercel --prod
```

## Recommended Vercel Settings

- Framework Preset: `Next.js`
- Root Directory: project root
- Node version: default Vercel-supported version is fine
- Build Command: `next build`
- Install Command: `npm install`

## Domain Setup

If you want a custom domain:

1. Open the deployed project in Vercel
2. Go to `Settings`
3. Open `Domains`
4. Add your custom domain
5. Update your DNS records as Vercel instructs

## Contact Form Notes

The contact form API lives at:

```text
app/api/contact/route.ts
```

This route uses Resend, so the deployment will work only when:

- `RESEND_API_KEY` is valid
- sender email is allowed by Resend
- destination email is set correctly

If environment variables are missing, the form will return an error response instead of sending mail.

## Build Check Before Deployment

Run this locally before pushing:

```bash
npm run build
```

If the build succeeds locally, deployment on Vercel is much more likely to succeed as well.

## After Deployment Checklist

After the site is deployed, test all of these:

- home page loads correctly
- section scrolling works smoothly
- hero background feels responsive
- social links open the correct destinations
- project modal opens and closes properly
- contact form submits correctly
- mobile layout looks correct
- animations do not stutter on slower devices

## Troubleshooting

### Problem: build fails on Vercel

Check:

- TypeScript errors
- missing environment variables
- broken imports or path aliases

### Problem: contact form does not send

Check:

- `RESEND_API_KEY`
- `CONTACT_FROM_EMAIL`
- `CONTACT_TO_EMAIL`
- sender domain verification inside Resend

### Problem: images are not correct

Check the files inside:

```text
public/images
```

## Summary

For most cases, the correct deployment flow is:

1. Push code to GitHub
2. Import repo into Vercel
3. Add environment variables
4. Deploy
5. Test the live site
