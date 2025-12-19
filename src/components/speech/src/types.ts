export interface SpeechOptions {
  lang?: string
  volume?: number // 0 - 1
  rate?: number   // 0.1 - 10
  pitch?: number  // 0 - 2
  voice?: SpeechSynthesisVoice
}
