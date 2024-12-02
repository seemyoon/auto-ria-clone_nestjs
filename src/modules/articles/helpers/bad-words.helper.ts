import * as forbiddenWords from 'src/json/swear_words.json';

export class CheckProfanityHelper {
  private static badWords: string[] = forbiddenWords.words.map((word) =>
    word.toLowerCase(),
  );

  public static async checkProfanity(text: string): Promise<boolean> {
    const normalizedText = text.toLowerCase();

    const words = normalizedText
      .split(/\s*,\s*|\s+/)
      .filter((word) => word.length > 0);

    const badWord = words.find((word) => this.badWords.includes(word));

    if (badWord) {
      return true;
    }

    return false;
  }
}
