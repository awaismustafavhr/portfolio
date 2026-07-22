import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

type ContactFormEmailProps = {
  name: string;
  email: string;
  company?: string;
  message: string;
};

export function ContactFormEmail({
  name,
  email,
  company,
  message,
}: ContactFormEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>New portfolio inquiry from {name}</Preview>
      <Body style={body}>
        <Container style={container}>
          <Heading style={heading}>New Portfolio Inquiry</Heading>
          <Text style={text}>You received a new message from your portfolio contact form.</Text>
          <Section style={card}>
            <Text style={label}>Name</Text>
            <Text style={value}>{name}</Text>
            <Hr style={divider} />
            <Text style={label}>Email</Text>
            <Text style={value}>{email}</Text>
            <Hr style={divider} />
            <Text style={label}>Company</Text>
            <Text style={value}>{company || "Not provided"}</Text>
            <Hr style={divider} />
            <Text style={label}>Message</Text>
            <Text style={value}>{message}</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const body = {
  backgroundColor: "#0a0a0f",
  color: "#f8fafc",
  fontFamily: "Inter, Arial, sans-serif",
  padding: "32px 16px",
};

const container = {
  margin: "0 auto",
  maxWidth: "640px",
};

const heading = {
  color: "#f8fafc",
  fontFamily: "Space Grotesk, Arial, sans-serif",
  fontSize: "28px",
  marginBottom: "12px",
};

const text = {
  color: "#94a3b8",
  fontSize: "16px",
  lineHeight: "1.7",
};

const card = {
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "16px",
  marginTop: "24px",
  padding: "24px",
};

const label = {
  color: "#06b6d4",
  fontSize: "12px",
  fontWeight: "700",
  letterSpacing: "0.18em",
  marginBottom: "8px",
  textTransform: "uppercase" as const,
};

const value = {
  color: "#f8fafc",
  fontSize: "15px",
  lineHeight: "1.8",
  marginTop: "0",
};

const divider = {
  borderColor: "rgba(255,255,255,0.08)",
  margin: "20px 0",
};
