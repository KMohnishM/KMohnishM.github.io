class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  parse(message) {
    // For now, pass any message to Gemini
    this.actionProvider.handleGeminiResponse(message);
  }
}

export default MessageParser;