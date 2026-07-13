import { env } from '../config/env.js'
import { AppError } from '../errors/appError.js'

const ALLOWED_OPENROUTER_BASE_URLS = ['https://openrouter.ai/api/v1']
const OPENROUTER_TIMEOUT_MS = 60_000

export async function generateCandidateCvAnalysis(
  prompt: string,
): Promise<string> {
  if (!env.AI_CV_ANALYSIS_ENABLED) {
    throw new AppError("L'analyse IA des CV est desactivee.", 503)
  }

  const normalizedPrompt = prompt.trim()

  if (!normalizedPrompt) {
    throw new AppError('Le prompt d analyse du CV est vide.', 400)
  }

  const apiKey = env.OPENROUTER_API_KEY.trim()
  const model = env.OPENROUTER_MODEL.trim()
  const baseUrl = normalizeOpenRouterBaseUrl(env.OPENROUTER_BASE_URL)

  if (!apiKey || !model) {
    throw new AppError("La configuration de l'IA est incomplete.", 503)
  }

  if (!ALLOWED_OPENROUTER_BASE_URLS.includes(baseUrl)) {
    throw new AppError("OPENROUTER_BASE_URL n'est pas autorisee.", 503)
  }

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), OPENROUTER_TIMEOUT_MS)

  const startedAt = Date.now()

  try {
    console.info('[CV_ANALYZE_AI] request started', {
      model,
      baseUrl,
      promptLength: normalizedPrompt.length,
    })

    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: 'POST',
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': env.FRONTEND_URL,
        'X-Title': 'CandiTrack',
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: 'user',
            content: normalizedPrompt,
          },
        ],
        temperature: 0,
      }),
    })

    const durationMs = Date.now() - startedAt

    if (!response.ok) {
      const errorBody = await response.text()

      console.error('[CV_ANALYZE_AI] request failed', {
        model,
        status: response.status,
        durationMs,
      })

      throw new AppError(
        "Impossible de contacter le service d'analyse IA.",
        502,
        [
          {
            field: 'response',
            message: errorBody || "Impossible de contacter le service d'analyse IA.",
          },
        ],
      )
    }

    const payload: unknown = await response.json()
    const analysisText = extractOpenRouterContent(payload)

    if (!analysisText.trim()) {
      throw new AppError('La reponse de l IA est vide.', 502)
    }

    console.info('[CV_ANALYZE_AI] request completed', {
      model,
      durationMs,
      responseLength: analysisText.length,
    })

    return analysisText
  } catch (error) {
    if (error instanceof AppError) {
      throw error
    }

    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new AppError("Impossible de contacter le service d'analyse IA.", 504)
    }

    throw new AppError("Impossible de contacter le service d'analyse IA.", 502)
  } finally {
    clearTimeout(timeoutId)
  }
}

function normalizeOpenRouterBaseUrl(baseUrl: string): string {
  try {
    return new URL(baseUrl.trim() || 'https://openrouter.ai/api/v1').toString().replace(/\/$/, '')
  } catch {
    return baseUrl.trim()
  }
}

function extractOpenRouterContent(payload: unknown): string {
  if (
    typeof payload !== 'object' ||
    payload === null ||
    !('choices' in payload) ||
    !Array.isArray((payload as { choices?: unknown[] }).choices)
  ) {
    return ''
  }

  const firstChoice = (payload as { choices: unknown[] }).choices[0]

  if (
    typeof firstChoice !== 'object' ||
    firstChoice === null ||
    !('message' in firstChoice)
  ) {
    return ''
  }

  const message = (firstChoice as { message?: unknown }).message

  if (
    typeof message !== 'object' ||
    message === null ||
    !('content' in message)
  ) {
    return ''
  }

  const content = (message as { content?: unknown }).content

  return typeof content === 'string' ? content : ''
}
