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
    name: 'MediaBay Lite',
    description:
      '大量の音声素材を高速に閲覧・整理するサンプルライブラリブラウザ。カラータグによる直感的な分類、波形プレビュー、Rate・Bit深度・チャンネルなどのメタ情報を一覧表示し、目的の音を瞬時に見つけ出せます。再生範囲やDAWへ受け渡す範囲も自由に指定可能。',
    note: '準備中',
    screenshots: ['media/apps/AudioMediaBayLite/AudioMediaBayLite.jpg'],
  },
  {
    name: 'AI Drum Multitrack De-bleeder',
    description:
      '生ドラム収録のマルチトラックWAVをドラッグ&ドロップするだけで、AIモデルがキック・スネア・タム・ハイハット・ライド・クラッシュへ自動分離。マイクに回り込む他パートの音(かぶり)を除去し、ミックスしやすいクリーンな個別トラックを一括書き出しします。',
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
      '複数のレイヤーとLFO・ノイズジェネレーターを重ね合わせ、キーフレームタイムラインとバッチ生成機能で多彩なネオン・サイバーパンク調の映像エフェクトをリアルタイムに構築するブラウザ完結型のジェネレーティブ映像クリエイター。クロマキー合成しやすい単色背景での書き出しにも対応。',
    badge: '無料公開 検討中',
    link: 'https://github.com/NobuoKiyota/MovieCreator',
    screenshots: ['media/apps/MovieCreator/MovieCreator.png'],
  },
  {
    name: 'DroneSound Generator',
    description:
      'MIDIの枠を超えた任意の周波数(10Hz〜10,000Hz)から直接音声合成する、ドローン・アンビエント特化のサウンドジェネレーター。ユニゾン・デチューンと倍音比率/振幅の手動設定で複雑な倍音構造を作り込め、コードクオリティやLFOスイープで持続的に表情を変化させるドローンサウンドを生成、WAV書き出しまで行えます。',
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
