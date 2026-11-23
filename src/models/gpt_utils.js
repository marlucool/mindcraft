/**
 * Apply options for local OpenAI-compatible model servers.
 *
 * LM Studio accepts chat_template_kwargs for Qwen models. Disabling thinking
 * keeps the response focused on the command-oriented output expected by
 * Mindcraft's agent loop.
 *
 * @param {string} model
 * @param {Record<string, any>} request
 * @returns {Record<string, any>}
 */
export function applyLocalModelOptions(model, request) {
    if (typeof model === 'string' && model.toLowerCase().includes('qwen')) {
        request.chat_template_kwargs = {
            ...(request.chat_template_kwargs || {}),
            enable_thinking: false,
        };
    }
    return request;
}

/**
 * Some OpenAI-compatible Qwen endpoints return reasoning_content separately
 * and leave message.content empty. Prefer normal content, then the reasoning
 * field, and always return a string.
 *
 * @param {any} completion
 * @returns {string}
 */
export function extractCompletionText(completion) {
    const message = completion?.choices?.[0]?.message;
    return message?.content || message?.reasoning_content || '';
}
