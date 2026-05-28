import { OnboardingPayload } from "@/lib/onboarding-types"

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ||
  "http://localhost:3001"

export interface SubmitOnboardingResponse {
  userId: string
  message: string
  portfolioAssetCount: number
}

export async function submitOnboarding(
  payload: OnboardingPayload
): Promise<SubmitOnboardingResponse> {
  const response = await fetch(`${API_BASE_URL}/onboarding`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error(await readErrorMessage(response))
  }

  return response.json()
}

async function readErrorMessage(response: Response): Promise<string> {
  try {
    const body = await response.json()

    if (typeof body?.message === "string") {
      return body.message
    }

    if (Array.isArray(body?.message)) {
      return body.message.join("\n")
    }
  } catch {
    // Use the generic message below when the backend returns a non-JSON error.
  }

  return "Unable to save onboarding information. Please try again in a moment."
}
