# 引き継ぎメモ (liaison.md)

最終更新: 2026-08-28

> このファイルは作業引き継ぎ用の補助メモです。**git履歴(`git log`)が正**なので、
> 内容に食い違いがあれば git log / 各コミットの diff を優先してください。

## プロジェクト概要

- 目的: **転職活動で見せるポートフォリオサイト**(音楽・映像制作 + AIアプリ開発の実績紹介)
- リポジトリ: https://github.com/NobuoKiyota/Portfolio
- 公開URL: https://nobuokiyota.github.io/Portfolio/ (GitHub Pages, `main` push で自動デプロイ)
- 技術: Astro (TypeScript strict) + 素のCSS。UIライブラリ・CSSフレームワークは不使用
- コンテンツはあくまで「見せるだけ」でよい。各AIアプリはスクショ/デモ音源/デモ動画の紹介に留め、
  ブラウザ版フル実装などは基本的にやらない方針(Canvas Creatorのブラウザ移植なども保留中)

## 開発コマンド

```bash
npm install
npm run dev      # localhost:4321、base が /Portfolio なので /Portfolio/ 配下を見る
npm run build    # 本番ビルド (dist/)
```

Astro側の `CLAUDE.md` にある通り、`astro dev --background` でバックグラウンド起動も可能。

## ディレクトリ構成

```
src/
  layouts/BaseLayout.astro   共通シェル。site-bg(背景画像)/Fireflies/Nav/Footer/SoundToggle を配置
  components/
    Nav.astro                 上部ナビ(高さは --nav-height で固定)
    Footer.astro
    SoundToggle.astro         右下、環境音ON/OFF(localStorage保存)
    SectionDots.astro         ページ内セクション位置インジケーター(上部中央、ドット)
    SectionArrows.astro       画面左右端、縦長三角形のセクション送りボタン(ホログラム風)
    WorkCard.astro            Works用カード(YouTube埋め込み/音声/準備中の3パターン)
    AppCard.astro             Apps用カード(スクショ・動画の複数枚スライド、音声プレイヤー群)
    Fireflies.astro           画面全体に浮かぶ光の粒(CSSアニメーションのみ、JS不要)
  data/
    works.ts                  楽曲・映像データ (YouTube / audioSrc / comingSoon)
    apps.ts                   AIアプリ・ツールデータ(screenshots/audioGroups/demoVideo/badge等)
    plugins.ts                Apps末尾の補足テキストのみ(個別VSTはapps.tsに統合済み)
  scripts/                    すべて BaseLayout.astro or 各コンポーネントの <script> から読み込み
    audio.ts                  AudioManager: UI効果音(mouse-over.wav/decide.wav)+ 環境音ドローン
    interactions.ts           [data-sound] 要素へのクリック/ホバー音の配線、SoundToggle配線
    horizontal-wheel.ts       縦ホイール入力を横スクロールへ変換(スナップセクション用)
    section-autoplay.ts       ページ内セクションのアイドル自動送り(8秒毎、操作で一時停止→6秒後再開)
    section-arrows.ts         SectionArrows のクリック送り + 先頭/末尾での自動無効化
    section-dots.ts           IntersectionObserverで現在地ドットをハイライト
    app-media-slider.ts       AppCard内メディアのリール(4秒毎自動送り、クリックで5秒フォーカス、動画再生中は停止)
    work-spectrum.ts          Works音声トラック背景の円形カレイドスコープ・スペクトラム(Web Audio Analyser)
  pages/
    index.astro / works.astro / apps.astro / profile.astro
    → いずれも `.snap-container` > `.snap-section`(横スクロールスナップ)構造
    → `.container` クラスは **セクション要素ではなく内側のdivに** つけること(過去にバグの原因になった。
      詳細は git log の "Fix section-width drift bug" コミット参照)
```

## サイトの挙動まとめ

- 各ページは横方向の `scroll-snap` でセクションが1画面ずつ切り替わる(縦ではなく横)
- ナビゲーション手段: マウスホイール(自動変換) / 左右端の三角ボタン / 上部ドットクリック / タッチスワイプ
- 放置すると自動でゆっくり次セクションへ進む(動画・音声再生中は進めない)
- 音: ホバー/クリックで効果音(サンプル再生)、環境音トグル、Works音声トラックは再生中に
  円形スペクトラムが背景に浮かぶ
- ダーク基調 + ゴールド(`--color-accent: #c9a86a`)のアクセント、装飾は控えめ

## 既知の注意点・詰まりポイント

- **このマシン(Z:ドライブ、ネットワークドライブ)でたまに `git add`/`commit`、さらには
  ファイル書き込み自体が `fsync error ... Bad file descriptor` 系のエラーで失敗することがある。**
  git操作の場合は `git -c core.fsyncObjectFiles=false add -A` のように
  **その場限りのオプションとして** fsyncを無効化すると回避できる(リポジトリ設定は変更しない)。
  単純なファイル書き込みで失敗した場合は、少し待ってからリトライするか、シェルの
  リダイレクト(`cat > file`)経由で書くと成功することが多い(ネットワークドライブの瞬断と思われる)。
- このセッションのブラウザ検証環境はタブが常に非表示(`document.hidden=true`)扱いになるため、
  `requestAnimationFrame` / `IntersectionObserver` / スムーズスクロールアニメーション / 実際の動画再生が
  正しく動かない。ロジック自体は数値・イベント発火の確認で担保しているが、実ブラウザでの目視確認が
  未了の項目がいくつかある(特に work-spectrum.ts の見た目、section-autoplay.ts の実際の間隔)。

## 直近でやったこと(新しい順)

1. Works音声トラック(Hard Techno Demo 1/2)の背景に円形カレイドスコープ・スペクトラムを追加
2. Hard Techno楽曲デモ2曲をWorksに追加、WorkCardが音声のみの作品にも対応
3. ページ全体のアイドル自動スライド(8秒毎、操作で一時停止)を追加
4. AppCardリールが動画再生中に強制送りされる不具合を修正
5. `.snap-section` に `.container` を直接付けていたことによる横幅ズレ(累積ドリフト)のバグを修正、
   ついでに三角ボタンのクリック判定漏れ(clip-pathがヒット領域まで削っていた)も修正
6. UIのクリック/ホバー音を実サンプル(mouse-over.wav / decide.wav)に切り替え
7. 左右端の三角ボタン(ホログラム風、ホイールの代替ナビ)を追加
8. ホタルの光の背景演出、DynamicSpaceReverb/HighSpeedSpectrumAnalyzerをAppとして追加

## 未着手・今後の候補

- Profileページはまだプレースホルダー(本人情報・SNSリンク未入力)
- MediaBay Lite / AI Drum Multitrack De-bleeder / DroneSound Generator / Canvas Creator は
  アプリ本体・ブラウザ版とも未リリース(スクショ/デモのみ掲載中の方針)
- VSTプラグイン(HighSpeedSpectrumAnalyzer / DynamicSpaceReverb ほか)のリポジトリは未整理・非公開
- Works/Apps以外の楽曲・映像・アプリが増えたら `src/data/*.ts` に追記するだけでページに反映される
