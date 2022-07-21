export class User {
  constructor({ displayName, avatarText, avatarBackgroundColor,genre }) {
    this.displayName = displayName;

    if (avatarText) {
      this.avatarText = avatarText;
    } else {
      this.avatarText = this.displayName.split(' ')
        .map((word) => word[0])
        .join('');
    }
    if (genre)
    {
      this.genre = genre;
    }
    if (avatarBackgroundColor) {
      this.avatarBackgroundColor = avatarBackgroundColor;
    } else {
      this.avatarBackgroundColor = `hsl(${Math.round(Math.random() * 360)}, 50%, 50%)`;
    }
  }

  static fromObject(dataObject) {
    const user = new User({
      displayName: dataObject.displayName,
      genre:dataObject.genre,
      avatarText: dataObject.avatarText,
      avatarBackgroundColor: dataObject.avatarBackgroundColor,
    });

    return user;
  }
}
