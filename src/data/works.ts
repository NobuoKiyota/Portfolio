export interface Work {
  title: string;
  description: string;
  tags: string[];
  youtubeId?: string;
  audioSrc?: string;
  comingSoon?: boolean;
}

export const works: Work[] = [
  {
    title: 'ダンジョンBGM',
    description:
      'Unreal Engineで自主制作した映像に合わせて制作した、トラディショナルなダンジョンBGM。映像と音楽を一貫した世界観で構築しています。',
    tags: ['Music', 'Video'],
    youtubeId: '1kbwczfkyhA',
  },
  {
    title: 'Hard Techno Demo 1',
    description:
      '重厚な四つ打ちとインダストリアルな質感のサウンドデザインを追求した、ハードテクノの楽曲デモ。',
    tags: ['Music', 'Hard Techno'],
    audioSrc: 'media/apps/MusicDemo/HardTechno1.mp3',
  },
  {
    title: 'Hard Techno Demo 2',
    description:
      'ビートをよりストイックに削ぎ落とし、レイヤーを効かせた音色構築で押し切るハードテクノの楽曲デモ。',
    tags: ['Music', 'Hard Techno'],
    audioSrc: 'media/apps/MusicDemo/HardTechno2.mp3',
  },
  {
    title: '近日公開',
    description: '新しい楽曲・映像を準備中です。',
    tags: [],
    comingSoon: true,
  },
];
