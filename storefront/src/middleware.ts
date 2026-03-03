import { NextRequest, NextResponse } from "next/server"

const BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL
const DEFAULT_LOCALE = "fr"
const LOCALES = ["fr", "en"]

/**
 * Middleware to handle locale selection and onboarding status.
 */
export async function middleware(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const isOnboarding = searchParams.get("onboarding") === "true"
  const cartId = searchParams.get("cart_id")
  const checkoutStep = searchParams.get("step")
  const onboardingCookie = request.cookies.get("_medusa_onboarding")
  const cartIdCookie = request.cookies.get("_medusa_cart_id")

  const { pathname } = request.nextUrl

  // Check if pathname starts with a locale
  const pathnameHasLocale = LOCALES.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  let locale = DEFAULT_LOCALE
  if (pathnameHasLocale) {
    locale = pathname.split("/")[1]
  } else {
    // Detect locale from Accept-Language or other logic could go here
    // For now, default to FR as requested
  }

  // If no locale in path, redirect to default locale (or detected)
  // But strictly, prompts asked to support fr/en and "detect".
  // Let's check headers for detection if not in path.
  if (!pathnameHasLocale) {
    const acceptLanguage = request.headers.get("accept-language")
    const detectedLocale = acceptLanguage?.startsWith("en") ? "en" : "fr" // Simplified detection

    // Construct new URL
    request.nextUrl.pathname = `/${detectedLocale}${pathname}`
    return NextResponse.redirect(request.nextUrl)
  }

  // Prepare response
  const response = NextResponse.next()

  // Add x-medusa-locale header
  response.headers.set("x-medusa-locale", locale)

  // Onboarding & Cart logic
  if (cartId && !checkoutStep) {
    const redirectUrl = request.nextUrl.href + "&step=address"
    const responseRedirect = NextResponse.redirect(redirectUrl, 307)
    responseRedirect.cookies.set("_medusa_cart_id", cartId, { maxAge: 60 * 60 * 24 })
    // Ensure we keep the header if we redirect? Headers on redirect response are for the client, not the next request.
    // But middleware runs on the request.
    return responseRedirect
  }

  if (isOnboarding) {
    response.cookies.set("_medusa_onboarding", "true", { maxAge: 60 * 60 * 24 })
  }

  return response
}

export const config = {
  matcher: ["/((?!api|_next/static|favicon.ico|.*\\.png|.*\\.jpg|.*\\.gif|.*\\.svg).*)"], // prevents redirecting on static files
}
