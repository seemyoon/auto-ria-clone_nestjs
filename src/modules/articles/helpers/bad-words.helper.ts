import * as forbiddenWords from 'src/json/swear_words.json';

export class BadWordsHelper {
  private static badWordsSet: Set<string> = new Set(forbiddenWords.words);

  public static async checkProfanity(text: string): Promise<boolean> {
    const normalizedText = text.toLowerCase();
    const words = normalizedText.match(/\b\w+\b/g) || [];

    for (const word of words) {
      if (this.badWordsSet.has(word)) {
        console.log('Profanity found:', word);
        return true;
      }
    }

    return false;
  }
}
