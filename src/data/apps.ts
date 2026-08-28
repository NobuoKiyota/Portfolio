export interface AudioSample {
  label: string;
  src: string;
}

export interface AudioGroup {
  title?: string;
  samples: AudioSample[];
}

export interface AppItem {
  name: string;
  description: string;
  badge?: string;
  link?: string;
  note?: string;
  screenshots?: string[];
  audioGroups?: AudioGroup[];
}

export const apps: AppItem[] = [
  {
    name: 'AudioAutoPlayer',
    description:
      'wav素材検索エンジン。高速なエクスプローラに加え、自由なタグ付け、再生範囲やDAWへの流し込み範囲指定までを実装。',
    note: '準備中',
  },
  {
    name: 'DrumSeparater',
    description:
      '生ドラム収録特化のパート分離アプリ。生収録では各マイクに対象以外の音が混ざるため、キック・スネア・タムなど楽器ごとに分離します。',
    note: 'アプリ本体は準備中',
    screenshots: [
      'media/apps/drum-separator/drum-separator1.png',
      'media/apps/drum-separator/drum-separator2.png',
    ],
    audioGroups: [
      {
        title: '分離前(オリジナル)',
        samples: [{ label: 'Demo', src: 'media/apps/drum-separator/demo.wav' }],
      },
      {
        title: '分離後',
        samples: [
          { label: 'Kick', src: 'media/apps/drum-separator/Kick.wav' },
          { label: 'Snare', src: 'media/apps/drum-separator/Snare.wav' },
          { label: 'Hi-hat', src: 'media/apps/drum-separator/Hi-hat.wav' },
          { label: 'Toms', src: 'media/apps/drum-separator/Toms.wav' },
          { label: 'Crash', src: 'media/apps/drum-separator/Crash.wav' },
          { label: 'Ride', src: 'media/apps/drum-separator/Ride.wav' },
        ],
      },
    ],
  },
  {
    name: 'MovieEffectCreator',
    description:
      'クロマキー処理しやすいよう背景色を単一化して出力しつつ、多種のパーティクルを演算し合わせて独特な動画エフェクトを生成するジェネレーティブ映像クリエイター。',
    badge: '無料公開 検討中',
    link: 'https://github.com/NobuoKiyota/MovieCreator',
  },
  {
    name: 'DroneSound Generator',
    description:
      'MIDIでは扱いきれない周波数を直接音声合成し、複雑な倍音を加えることで独特なドローンサウンドを生成するアプリ。',
    note: 'アプリ本体は準備中',
    screenshots: ['media/apps/drone-sound/DroneSoundGenerator_SS.png'],
    audioGroups: [
      {
        samples: [
          { label: 'Demo 1', src: 'media/apps/drone-sound/DroneSoundGenerator_Demo1.mp3' },
          { label: 'Demo 2', src: 'media/apps/drone-sound/DroneSoundGenerator_Demo2.mp3' },
          { label: 'Demo 3', src: 'media/apps/drone-sound/DroneSoundGenerator_Demo3.mp3' },
        ],
      },
    ],
  },
];
