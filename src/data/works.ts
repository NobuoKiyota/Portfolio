export interface Work {
  title: string;
  description: string;
  tags: string[];
  youtubeId?: string;
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
    title: '近日公開',
    description: '新しい楽曲・映像を準備中です。',
    tags: [],
    comingSoon: true,
  },
];
