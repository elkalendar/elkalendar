export const getRandomSuccessEmoji = () => {
  const emojis = [
    '🙌',
    '🏆',
    '🎉',
    '👏',
    '👍',
    '👌',
    '🤙',
    '🤘',
  ];

  return emojis[Math.floor(Math.random() * emojis.length)];
}
