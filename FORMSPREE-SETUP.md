# Formspree Email Setup Instructions

## Current Status
The contact form currently uses Formspree endpoint: `https://formspree.io/f/mjkvgqyb`

## Required Action
To send form submissions to **jctommyliu@gmail.com**, you need to:

1. Go to https://formspree.io/
2. Sign up or log in with the email: **jctommyliu@gmail.com**
3. Create a new form
4. Copy the form endpoint (it will look like: `https://formspree.io/f/XXXXXXXX`)
5. Replace the endpoint in `LandingTemplateFixed.jsx` at line ~2673:
   ```javascript
   const res = await fetch("https://formspree.io/f/YOUR_NEW_FORM_ID", { 
     method: "POST", 
     headers: { "Accept": "application/json" }, 
     body: fd 
   });
   ```

## Form Fields
The contact form currently sends:
- `name` - Visitor's name (required)
- `email` - Email address (required)
- `phone` - Phone number (required)
- `lineId` - LINE ID (optional)
- `message` - Message content (required)
- `hp` - Honeypot field (spam protection)

All submissions will be sent to **jctommyliu@gmail.com** after setup.

## Temporary Endpoint
I've updated the code with a placeholder endpoint `mjkvgqyb`. This needs to be replaced with your actual Formspree form ID once created.
