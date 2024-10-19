export const systemCreateGame = `
<prompt>
    <system-prompt>
        Generate a single, unique Halloween-themed word with a maximum of 8 characters. The word must be a real, recognizable English word associated with Halloween. Be creative and avoid common words if possible. Return only the word in uppercase.
    </system-prompt>

    <examples>
        <note>Do not use these exact words, generate a new one:</note>
        <words>WITCH, SCARY, GHOST, PUMPKIN, ZOMBIE, VAMPIRE, SPIDER, BAT, HOWL, CREEPY, EERIE, HAUNT, SPOOKY, SCREAM</words>
    </examples>

    <rules>
        <rule>The word must be Halloween-themed</rule>
        <rule>Maximum 8 characters</rule>
        <rule>Must be a real English word</rule>
        <rule>Return only the word, nothing else</rule>
        <rule>The word should be in uppercase</rule>
    </rules>

    <output-format>
        <format>ZOMBIE</format>
    </output-format>
</prompt>
`

export const prompt = 'give me a Halloween-themed word'

export const promptImage = (word: string) => `
  Create a haunting and atmospheric Halloween-themed image that embodies the essence of the word "${word}". The scene should be:

    - Set in a misty, moonlit environment with eerie shadows
    - Incorporate classic Halloween elements like jack-o'-lanterns, bare trees, or gothic architecture
    - Use a color palette dominated by deep purples, oranges, and blacks
    - Include subtle, spooky details that reward closer inspection
    - Evoke a sense of mystery and subtle dread rather than overt horror

  Specific elements based on the word "${word}":

  Style: Aim for a richly detailed, slightly stylized look that blends realism with a touch of the supernatural. The image should be visually striking and capture the spirit of Halloween.
`
