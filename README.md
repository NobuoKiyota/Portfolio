# Portfolio

Nobuo Kiyota の音楽・映像制作、AIアプリ開発実績を紹介するポートフォリオサイト。Astroで構築し、GitHub Pagesで公開する。

## 構成

```text
src/
  layouts/BaseLayout.astro   共通レイアウト(ヘッダー/フッター/サウンドトグル)
  components/                Nav / Footer / SoundToggle / WorkCard / AppCard
  data/                      works.ts / apps.ts / plugins.ts (掲載コンテンツ)
  scripts/                   audio.ts (Web Audio によるクリック音・環境音), interactions.ts
  pages/                     index / works / apps / profile
```

## コマンド

| コマンド            | 内容                                   |
| :------------------ | :------------------------------------- |
| `npm install`        | 依存関係のインストール                 |
| `npm run dev`         | ローカル開発サーバー起動 (`localhost:4321`) |
| `npm run build`       | `./dist/` へ本番ビルド                 |
| `npm run preview`     | ビルド済みサイトのプレビュー           |

## デプロイ (GitHub Pages)

`main` ブランチへの push で `.github/workflows/deploy.yml` が自動ビルド・デプロイする。
初回のみ、リポジトリの **Settings > Pages > Source** を `GitHub Actions` に設定すること。

`astro.config.mjs` の `site` / `base` は `https://nobuokiyota.github.io/Portfolio` を前提にしている。
リポジトリ名やユーザー名を変更した場合はあわせて更新する。

## コンテンツの更新

楽曲・映像・アプリの情報は `src/data/*.ts` を編集するだけで反映される。新規ページ追加時は
`src/pages/` にファイルを追加し、`src/components/Nav.astro` の `links` にリンクを追加する。
