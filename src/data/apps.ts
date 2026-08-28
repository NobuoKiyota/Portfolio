export interface AppItem {
  name: string;
  description: string;
  badge?: string;
  link?: string;
  note?: string;
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
    note: '準備中',
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
    note: 'デモ音源 追加予定',
  },
];
