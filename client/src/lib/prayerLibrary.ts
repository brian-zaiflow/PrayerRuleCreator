export interface Prayer {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
}

export const prayerCategories = [
  "Morning Prayers",
  "Evening Prayers",
  "Prayers for Life Events",
  "Prayers to the Theotokos",
  "Prayers to Saints",
  "Psalms",
  "General Prayers",
  "Commemorations",
] as const;

export type PrayerCategory = typeof prayerCategories[number];

export const prayerLibrary: Prayer[] = [
  // Morning Prayers
  {
    id: "trisagion",
    title: "Trisagion Prayers",
    content: `In the Name of the Father, and of the Son, and of the Holy Spirit. Amen.

Glory to Thee, our God, glory to Thee.

O Heavenly King, the Comforter, the Spirit of Truth, Who art everywhere and fillest all things, Treasury of Blessings, and Giver of Life: Come and abide in us, and cleanse us from every impurity, and save our souls, O Good One.

Holy God, Holy Mighty, Holy Immortal, have mercy on us. (3 times)

Glory to the Father, and to the Son, and to the Holy Spirit, now and ever and unto ages of ages. Amen.

O Most-Holy Trinity, have mercy on us. O Lord, cleanse us from our sins. O Master, pardon our transgressions. O Holy One, visit and heal our infirmities, for Thy Name's sake.

Lord, have mercy. (3 times)

Glory to the Father, and to the Son, and to the Holy Spirit, now and ever and unto ages of ages. Amen.

Our Father, Who art in heaven, hallowed be Thy Name. Thy kingdom come. Thy will be done, on earth as it is in heaven. Give us this day our daily bread; and forgive us our trespasses, as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil.`,
    category: "Morning Prayers",
    tags: ["daily", "foundational", "trinity"],
  },
  {
    id: "morning-prayer",
    title: "Morning Prayer",
    content: `Having risen from sleep, I thank Thee, O Holy Trinity, for through Thy great goodness and patience Thou wast not angered with me, an idler and sinner, nor hast Thou destroyed me in my sins, but hast shown Thy usual love for mankind. And when I was prostrate in despair, Thou hast raised me to keep the morning watch and glorify Thy power. And now enlighten my mind's eye and open my mouth to study Thy words and understand Thy commandments, and to do Thy will, and sing to Thee in heartfelt adoration, and praise Thy Most-Holy Name of Father, Son and Holy Spirit, now and ever, and unto the ages of ages. Amen.

Come, let us worship God our King.
Come, let us worship and fall down before Christ, our King and our God.
Come, let us worship and fall down before Christ Himself, our King and our God.`,
    category: "Morning Prayers",
    tags: ["daily", "thanksgiving"],
  },
  {
    id: "jesus-prayer",
    title: "The Jesus Prayer",
    content: `Lord Jesus Christ, Son of God, have mercy on me, a sinner.`,
    category: "General Prayers",
    tags: ["contemplative", "short", "hesychasm"],
  },

  // Evening Prayers
  {
    id: "evening-prayer",
    title: "Evening Prayer",
    content: `O Lord our God, as Thou art good and lovest mankind, forgive me wherein I have sinned today, whether in word, deed, or thought. Grant me peaceful and undisturbed sleep. Send Thine Angel to guard and protect me from every evil. For Thou art the guardian of our souls and bodies, and to Thee do we send up glory: to the Father, and to the Son, and to the Holy Spirit, now and ever, and unto ages of ages. Amen.`,
    category: "Evening Prayers",
    tags: ["daily", "forgiveness", "protection"],
  },
  {
    id: "peaceful-sleep",
    title: "Prayer for Peaceful Sleep",
    content: `Into Thy hands, O Lord Jesus Christ my God, I commend my spirit; do Thou bless me, do Thou have mercy on me, and grant me life eternal. Amen.`,
    category: "Evening Prayers",
    tags: ["daily", "rest"],
  },

  // Prayers for Life Events
  {
    id: "find-spouse",
    title: "Prayer to Find a Spouse",
    content: `O Holy Martyrs, who fought the good fight and have received your crowns: Entreating the Lord that I may be granted repentance, do not despise me, the sinner that I am, but be mindful of me and pray for me, a supplicant. And especially now I beseech you, O holy ones, as you stand before the Throne of God: Be intercessors on behalf of me the unworthy one, that the Lord may help me find a pious spouse, a true helpmate, Orthodox and pleasing to God. For the salvation of my soul and an honorable life do I petition. Send me a companion of my labors and a sharer of my life who will help me save my soul and be pleasing to God. For this reason I cry out to you: Rejoice, heavenly champions who intercede for us before the Lord! Amen.`,
    category: "Prayers for Life Events",
    tags: ["marriage", "intercession"],
  },
  {
    id: "before-journey",
    title: "Prayer Before a Journey",
    content: `O Lord Jesus Christ our God, the true and living Way, be Thou, O Master, my companion, guide, and guardian during my journey; deliver and protect me from all danger, misfortune, and temptation; that being so defended by Thy divine power, I may have a peaceful and successful journey and arrive safely at my destination. For in Thee I put my trust and hope, and to Thee do I send up glory, together with Thy Eternal Father, and Thy Most-Holy, Good, and Life-Creating Spirit, now and ever, and unto ages of ages. Amen.`,
    category: "Prayers for Life Events",
    tags: ["travel", "protection"],
  },
  {
    id: "before-meal",
    title: "Prayer Before Meals",
    content: `Our Father, Who art in heaven, hallowed be Thy Name. Thy kingdom come. Thy will be done, on earth as it is in heaven. Give us this day our daily bread; and forgive us our trespasses, as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil.

Christ our God, bless the food and drink of Thy servants, for Thou art holy, always, now and ever, and unto ages of ages. Amen.`,
    category: "General Prayers",
    tags: ["daily", "meals", "blessing"],
  },

  // Prayers to the Theotokos
  {
    id: "theotokos-hymn",
    title: "Hymn to the Theotokos",
    content: `It is truly meet to bless thee, O Theotokos, ever-blessed and most pure, and the Mother of our God. More honorable than the Cherubim, and more glorious beyond compare than the Seraphim, without defilement thou gavest birth to God the Word: true Theotokos, we magnify thee.`,
    category: "Prayers to the Theotokos",
    tags: ["theotokos", "hymn"],
  },
  {
    id: "theotokos-protection",
    title: "Prayer of Protection to the Theotokos",
    content: `O Most Holy Theotokos, save us!

O Virgin Theotokos, rejoice, Mary full of grace, the Lord is with thee. Blessed art thou among women, and blessed is the Fruit of thy womb, for thou hast borne the Savior of our souls.

Beneath thy compassion we take refuge, O Theotokos: do not despise our petitions in time of trouble, but rescue us from dangers, only pure, only blessed one.`,
    category: "Prayers to the Theotokos",
    tags: ["theotokos", "protection", "intercession"],
  },

  // Psalms
  {
    id: "psalm-23",
    title: "Psalm 23 (22)",
    content: `The Lord is my shepherd; I shall not want.

He makes me to lie down in green pastures; He leads me beside the still waters.

He restores my soul; He leads me in the paths of righteousness for His name's sake.

Yea, though I walk through the valley of the shadow of death, I will fear no evil; for You are with me; Your rod and Your staff, they comfort me.

You prepare a table before me in the presence of my enemies; You anoint my head with oil; my cup runs over.

Surely goodness and mercy shall follow me all the days of my life; and I will dwell in the house of the Lord forever.`,
    category: "Psalms",
    tags: ["psalm", "comfort", "protection"],
  },
  {
    id: "psalm-51",
    title: "Psalm 51 (50) - Prayer of Repentance",
    content: `Have mercy on me, O God, according to Your great mercy; and according to the multitude of Your compassions blot out my transgression.

Wash me thoroughly from my iniquity, and cleanse me from my sin.

For I know my iniquity, and my sin is ever before me.

Against You only have I sinned and done this evil before You, that You might be justified in Your words, and prevail when You are judged.

For behold, I was conceived in iniquities, and in sins my mother bore me.

For behold, You have loved truth; the hidden and secret things of Your wisdom You have made manifest to me.

You shall sprinkle me with hyssop, and I shall be made clean; You shall wash me, and I shall be made whiter than snow.

You shall make me to hear joy and gladness; the bones that are humbled shall rejoice.

Turn Your face away from my sins, and blot out all my iniquities.

Create in me a clean heart, O God, and renew a right spirit within me.

Cast me not away from Your presence, and take not Your Holy Spirit from me.

Restore to me the joy of Your salvation, and with Your governing Spirit establish me.

I shall teach transgressors Your ways, and the ungodly shall turn back to You.

Deliver me from bloodguiltiness, O God, the God of my salvation; my tongue shall rejoice in Your righteousness.

O Lord, You shall open my lips, and my mouth shall declare Your praise.

For if You desired sacrifice, I would have given it; with whole burnt offerings You shall not be pleased.

A sacrifice to God is a broken spirit; a heart that is broken and humbled God will not despise.

Do good, O Lord, in Your good pleasure to Zion, and let the walls of Jerusalem be built.

Then You shall be pleased with a sacrifice of righteousness, with oblation and whole burnt offerings.

Then shall they offer calves upon Your altar.`,
    category: "Psalms",
    tags: ["psalm", "repentance", "forgiveness"],
  },

  // Prayers to Saints
  {
    id: "st-nicholas",
    title: "Prayer to St. Nicholas",
    content: `O most blessed Nicholas, great wonderworker and favorite of God, helper of the desperate and protector of the orphans and widows: be mindful of me, a wretched sinner, who am without help and full of despair. In thy compassion I beseech thee, pray unto the Lord for me, a sinful and unworthy servant of thine, that He forgive me all my sins and transgressions through thy holy prayers. Ask for me mercy and grace from our Lord; and in this present life peace and health; and help for those who are sick, and deliverance from misfortune and distress. O holy hierarch Nicholas, forget not thy promise to hearken unto those who call upon thy name; for thou hast said that whosoever calleth upon thee will receive thy help at every season. For this cause I cry unto thee: Help me, O holy hierarch Nicholas, that I perish not with my sins; pray for me, a sinful and unworthy servant of thine. Amen.`,
    category: "Prayers to Saints",
    tags: ["st-nicholas", "intercession", "help"],
  },
  {
    id: "guardian-angel",
    title: "Prayer to One's Guardian Angel",
    content: `O Angel of Christ, holy guardian and protector of my soul and body, forgive me all wherein I have offended thee every day of my life, and protect me from all influence and temptation of the evil one. May I never more anger God by any sin. Pray for me to the Lord, that He may make me worthy of the grace of the All-Holy Trinity, and of the Mother of my Lord Jesus Christ, and of all the Saints. Amen.`,
    category: "Prayers to Saints",
    tags: ["guardian-angel", "protection", "forgiveness"],
  },

  // General Prayers
  {
    id: "thanksgiving",
    title: "Prayer of Thanksgiving",
    content: `Glory to Thee, O Lord, glory to Thee.

Glory to Thee Who hast shown us the light.

Glory to God in the highest, and on earth peace, good will among men.

We praise Thee, we bless Thee, we worship Thee, we glorify Thee, we give thanks to Thee for Thy great glory.

O Lord King, heavenly God, Father Almighty; O Lord, the only-begotten Son, Jesus Christ; and O Holy Spirit.

O Lord God, Lamb of God, Son of the Father, that takest away the sin of the world, have mercy on us; Thou that takest away the sins of the world.

Receive our prayer, Thou that sittest at the right hand of the Father, and have mercy on us.

For Thou only art holy, Thou only art the Lord, O Jesus Christ, to the Glory of God the Father. Amen.`,
    category: "General Prayers",
    tags: ["thanksgiving", "praise", "glory"],
  },
  {
    id: "for-enemies",
    title: "Prayer for Enemies",
    content: `O Lord, Who lovest mankind, I pray Thee for those who hate and wrong me. Forgive their sins and my sins also; enlighten them with the light of Thy truth. Visit them with Thy salvation that they may be saved. Make them worthy to partake of Thy eternal blessings, and make me also, though unworthy, a partaker of these blessings. Amen.`,
    category: "General Prayers",
    tags: ["forgiveness", "love", "enemies"],
  },

  // Commemorations
  {
    id: "commemoration-living",
    title: "For the Living",
    content: `Save, O Lord, and have mercy upon:
___
___
___

Preserve them through the intercessions of the Theotokos and all the Saints, O Thou Who alone lovest mankind.`,
    category: "Commemorations",
    tags: ["commemorations", "living", "intercession"],
  },
  {
    id: "commemoration-departed-orthodox",
    title: "For the Departed (Orthodox)",
    content: `Give rest, O Lord, to the souls of Thy departed servants:
___
___
___

Pardon all their transgressions, both voluntary and involuntary, granting them the Kingdom and a portion in Thine eternal good things, and the enjoyment of Thine endless and blessed Life.`,
    category: "Commemorations",
    tags: ["commemorations", "departed", "orthodox", "repose"],
  },
  {
    id: "commemoration-departed-all",
    title: "For the Departed (All Souls)",
    content: `O God of spirits and of all flesh, Who hast trampled down death and overthrown the Devil, and given life to Thy world: Do Thou, the same Lord, give rest to the souls of Thy departed servants:
___
___
___

In a place of brightness, a place of verdure, a place of repose, whence all sickness, sorrow and sighing have fled away. Pardon every transgression which they have committed, whether by word or deed or thought. For Thou art a good God and lovest mankind; because there is no man who lives yet does not sin, for Thou only art without sin, Thy righteousness is to all eternity, and Thy word is truth.`,
    category: "Commemorations",
    tags: ["commemorations", "departed", "all-souls", "repose"],
  },
];

// Helper function to get prayers by category
export function getPrayersByCategory(category: PrayerCategory): Prayer[] {
  return prayerLibrary.filter(prayer => prayer.category === category);
}

// Helper function to search prayers
export function searchPrayers(query: string): Prayer[] {
  const lowercaseQuery = query.toLowerCase();
  return prayerLibrary.filter(prayer =>
    prayer.title.toLowerCase().includes(lowercaseQuery) ||
    prayer.content.toLowerCase().includes(lowercaseQuery) ||
    prayer.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
}
