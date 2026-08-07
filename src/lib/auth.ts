import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const JWT_SECRET = process.env.JWT_SECRET!;
const SESSION_COOKIE_NAME = "kr_admin_session";
const SESSION_DURATION = 60 * 60 * 24 * 7; // 7 days in seconds

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is not defined");
}

const secretKey = new TextEncoder().encode(JWT_SECRET);

export interface SessionPayload {
  adminId: string;
  email: string;
  name: string;
  role: string;
}

export interface SessionData extends SessionPayload {
  iat: number;
  exp: number;
}

export async function createSessionToken(
  payload: SessionPayload
): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION}s`)
    .sign(secretKey);
}

export async function verifySessionToken(
  token: string
): Promise<SessionData | null> {
  try {
    const { payload } = await jwtVerify(token, secretKey);
    return payload as unknown as SessionData;
  } catch {
    return null;
  }
}

export async function setSessionCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_DURATION,
    path: "/",
  });
}

export async function getSession(): Promise<SessionData | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;

  return verifySessionToken(token);
}

export async function clearSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

export async function requireAuth(): Promise<SessionData> {
  const session = await getSession();
  if (!session) {
    redirect("/admin/login");
  }
  return session;
}

export async function requireAdmin(): Promise<SessionData> {
  const session = await requireAuth();
  if (session.role !== "admin") {
    redirect("/admin/login");
  }
  return session;
}

export async function redirectIfAuthenticated(): Promise<void> {
  const session = await getSession();
  if (session) {
    redirect("/admin/dashboard");
  }
}