"use client";

import React, { useState } from "react";
import ActivityBar from "@/components/ActivityBar";
import Sidebar from "@/components/Sidebar";
import SearchPanel from "@/components/SearchPanel";
import SourceControlPanel from "@/components/SourceControlPanel";
import ExtensionsPanel from "@/components/ExtensionsPanel";
import MainEditor from "@/components/MainEditor";
import styles from "./page.module.css";

interface Tab {
  id: string;
  name: string;
  content: string;
  language: string;
}

interface FileContent {
  [key: string]: {
    content: string;
    language: string;
  };
}

export default function Home() {
  const [tabs, setTabs] = useState<Tab[]>([
    {
      id: "about.md",
      name: "about.md",
      language: "markdown",
      content: `# About Me

こんにちは！私はフロントエンド開発者です。

## スキル
- React / Next.js
- TypeScript
- CSS / Sass
- Node.js

## 経験
- Webアプリケーション開発
- レスポンシブデザイン
- パフォーマンス最適化`,
    },
  ]);

  const [activeTab, setActiveTab] = useState("about.md");
  const [activeActivity, setActiveActivity] = useState("explorer");
  const [sidebarWidth, setSidebarWidth] = useState(250);
  const [isResizing, setIsResizing] = useState(false);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(
    new Set(["projects"])
  );

  const handleMouseDown = () => {
    setIsResizing(true);
  };

  const handleMouseMove = React.useCallback(
    (e: MouseEvent) => {
      if (!isResizing) return;

      const newWidth = e.clientX - 48; // ActivityBarの幅（48px）を引く
      if (newWidth >= 200 && newWidth <= 600) {
        setSidebarWidth(newWidth);
      }
    },
    [isResizing]
  );

  const handleMouseUp = () => {
    setIsResizing(false);
  };

  // マウスイベントのリスナーを設定
  React.useEffect(() => {
    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [isResizing, handleMouseMove]);

  const fileContents: FileContent = {
    "about.md": {
      content: `# About Me

こんにちは！私はフロントエンド開発者です。

## スキル
- React / Next.js
- TypeScript
- CSS / Sass
- Node.js

## 経験
- Webアプリケーション開発
- レスポンシブデザイン
- パフォーマンス最適化`,
      language: "markdown",
    },
    "skills.json": {
      content: `{
  "frontend": [
    "React",
    "Next.js",
    "TypeScript",
    "Vue.js"
  ],
  "backend": [
    "Node.js",
    "Express",
    "Python",
    "Django"
  ],
  "tools": [
    "Git",
    "Docker",
    "AWS",
    "Figma"
  ]
}`,
      language: "json",
    },
    "contact.ts": {
      content: `interface Contact {
  email: string;
  github: string;
  linkedin: string;
  twitter: string;
}

const contact: Contact = {
  email: "your.email@example.com",
  github: "https://github.com/yourusername",
  linkedin: "https://linkedin.com/in/yourusername",
  twitter: "https://twitter.com/yourusername"
};

export default contact;`,
      language: "typescript",
    },
    "Othello.tsx": {
      content: `# ⚫⚪ Othello - 戦略思考ゲーム

## 🎮 ゲーム概要
クラシックなオセロ（リバーシ）をWebブラウザで楽しめるゲームアプリケーション

## ✨ ゲーム機能
- **AI対戦**: コンピューター相手に戦略的なゲームプレイ
- **2人対戦**: 友人や家族との対戦モード
- **ゲーム履歴**: 手順の振り返り機能
- **難易度選択**: 初心者から上級者まで対応
- **美しいUI**: 直感的で見やすいゲーム盤面

## 🛠️ 技術的実装
- **ゲームロジック**: TypeScriptによる戦略ゲーム開発
- **状態管理**: React Hooksを活用したゲーム状態管理
- **アルゴリズム**: ミニマックス法によるAI思考ルーチン
- **レスポンシブ**: デバイスを問わないゲーム体験

## 📚 開発で学んだこと
- ゲームプログラミングの基礎
- アルゴリズム思考の実践
- ユーザーインターフェース設計
- 状態管理パターンの理解

## 🔗 リンク
- [🎮 ゲームプレイ](https://sho0226.github.io/NewOthello/)
- [📂 GitHub Repository](https://github.com/Sho0226/NewOthello/)

## 🎯 プレイのコツ
角を取ることが勝利への鍵！戦略的思考を鍛えよう`,
      language: "markdown",
    },
    "TodoList.tsx": {
      content: `# 📝 TodoList - フルスタック タスク管理アプリ

## 🎯 プロジェクト概要
個人・チーム向けのタスク管理Webアプリケーション

## ✨ 主な機能
- タスクの作成・編集・削除・完了管理
- カテゴリ別タスク整理
- 期限設定とリマインダー
- ユーザー認証システム（JWT認証）
- レスポンシブデザイン対応

## 🛠️ 技術スタック
**フロントエンド**
- Next.js 13 (App Router)
- TypeScript
- CSS Modules

**バックエンド**
- Fastify (高速WebAPI)
- Prisma ORM
- PostgreSQL

**認証・セキュリティ**
- JWT認証
- Bcrypt暗号化

## 🎨 実装のポイント
- TypeScriptによる型安全な開発
- Prismaを活用したデータベース設計
- JWTトークンによるセキュアな認証システム
- モダンなUI/UXデザイン

## 🔗 リンク
- [🌐 デモサイト](https://todolist-6aet.onrender.com/)
- [📂 GitHub Repository](https://github.com/Sho0226/TodoList/)

## 📈 開発状況
現在、認証機能の強化とパフォーマンス最適化を進行中`,
      language: "markdown",
    },
    "AIHeadlines.tsx": {
      content: `# 🤖 AIHeadlines - AIパーソナライズドニュースプラットフォーム

## 🎯 プロジェクト概要
AIを活用してユーザーの興味に合わせてニュースをキュレーションする次世代ニュースプラットフォーム

## ✨ 主な機能
- **AIニュース推薦**: ユーザーの閲覧履歴から興味を分析
- **キーワード検索**: 関心のあるトピックを深掘り
- **カテゴリフィルタ**: 政治・経済・テクノロジー・スポーツ等
- **お気に入り保存**: 重要な記事をブックマーク
- **トレンド分析**: 話題の記事をリアルタイム表示

## 🛠️ 技術スタック
**フロントエンド**
- Next.js 13 + TypeScript
- レスポンシブデザイン

**バックエンド**
- Fastify API Server
- PostgreSQL + Prisma ORM
- 外部ニュースAPI連携

**AI・機械学習**
- 自然言語処理による記事分析
- 協調フィルタリング推薦システム

## 🎨 実装のポイント
- ユーザー行動データの収集・分析
- リアルタイムニュース取得システム
- パーソナライゼーションアルゴリズム
- 高速な記事検索・フィルタリング

## 🔗 リンク
- [🌐 デモサイト](https://aiheadlines.onrender.com/)
- [📂 GitHub Repository](https://github.com/Sho0226/AIHeadlines)

## 💡 今後の展望
- 多言語対応
- プッシュ通知機能
- ソーシャル機能の追加`,
      language: "markdown",
    },
    "花火大会オンライン.tsx": {
      content: `# 🎆 花火大会オンライン - バーチャル花火体験プラットフォーム

## 🏆 受賞歴
**技育CAMP2024 Vol.14 最優秀賞受賞** (2024年9月)

## 🎯 プロジェクト概要
オンライン上で花火玉をカスタマイズし、リアルタイムで共有体験できるバーチャル花火大会プラットフォーム

## ✨ 主な機能
- **花火玉エディタ**: 色・形・爆発パターンを自由にカスタマイズ
- **リアルタイム共有**: 複数ユーザーが同じ空間で花火を楽しむ
- **ルーム機能**: 友人・家族と専用空間を作成
- **3D花火演出**: 美しい3Dグラフィックスによる没入感
- **音響効果**: リアルな花火の音響体験

## 🛠️ 技術スタック
**フロントエンド**
- Next.js + TypeScript
- Three.js (3Dグラフィックス)
- WebGL (高性能レンダリング)

**バックエンド**
- Fastify (高速API)
- WebSocket (リアルタイム通信)
- PostgreSQL + Prisma

**リアルタイム通信**
- Socket.io
- リアルタイム状態同期

## 🎨 実装のポイント
- **物理エンジン**: リアルな花火の軌道・爆発シミュレーション
- **最適化**: 大量のパーティクル処理の最適化
- **同期システム**: 複数ユーザー間の状態同期
- **カスタマイザー**: 直感的な花火デザインツール

## 🏅 評価ポイント
- 革新的なアイデアと実装力
- 高いユーザー体験の実現
- 技術的な挑戦と完成度
- チーム開発での協調性

## 🔗 リンク
- [📂 GitHub Repository](https://github.com/Sho0226/Fireworks-Display-Online)

## 🌟 開発の意義
地理的制約を超えて、誰もが花火大会を楽しめる新しい体験の創造`,
      language: "markdown",
    },
    "Fullstack-Template.tsx": {
      content: `# 🚀 Fullstack Template - モダンWeb開発テンプレート

## 🎯 プロジェクト概要
最新のWeb技術を組み合わせた、高性能フルスタックアプリケーションのテンプレート・ボイラープレート

## ✨ 主な特徴
- **Next.js 13 App Router**: 最新のReactフレームワーク
- **型安全性**: TypeScriptによる完全な型定義
- **高速API**: Honoによる軽量で高速なバックエンド
- **現代的DB管理**: Prisma ORM + PostgreSQL
- **即座にデプロイ**: Vercel + Supabaseでワンクリックデプロイ

## 🛠️ 技術スタック
**フロントエンド**
- Next.js 13 (App Router)
- TypeScript
- Tailwind CSS (予定)

**バックエンド**
- Hono (Ultra-fast Web Framework)
- Prisma ORM
- PostgreSQL

**インフラ・デプロイ**
- Vercel (フロントエンド)
- Supabase (データベース)
- GitHub Actions (CI/CD)

## 🎨 アーキテクチャ設計
- **関心の分離**: フロントエンド・バックエンドの明確な分割
- **スケーラビリティ**: 大規模開発にも対応可能な構造
- **開発体験**: TypeScriptによる型安全性とホットリロード
- **パフォーマンス**: 最適化されたバンドルサイズと高速レンダリング

## 📖 ドキュメント
包括的なセットアップガイドと開発ドキュメントを提供

## 🔗 リンク
- [🌐 デモサイト](https://next-hono-template.vercel.app)
- [📂 GitHub Repository](https://github.com/Sho0226/Next-Hono-Template)
- [📝 技術解説記事](https://zenn.dev/sho0226/articles/8f8e130371b117)

## 💡 活用方法
- 新規プロジェクトの開始点として
- モダンな技術スタックの学習教材として
- チーム開発での共通基盤として`,
      language: "markdown",
    },
    "ポケモン図鑑.tsx": {
      content: `# 🔍 ポケモン図鑑 - インタラクティブ図鑑アプリ

## 🎯 プロジェクト概要
PokéAPIを活用した、検索・フィルタリング機能付きのインタラクティブなポケモン図鑑

## ✨ 主な機能
- **全ポケモン表示**: 900体以上のポケモンデータを表示
- **詳細検索**: 名前・タイプ・世代で絞り込み検索
- **詳細情報**: ステータス・進化・技などの詳細データ
- **お気に入り**: 気になるポケモンをブックマーク
- **レスポンシブデザイン**: スマホ・タブレット対応

## 🛠️ 技術スタック
**フロントエンド**
- React + TypeScript
- Vite (高速ビルドツール)
- CSS Modules

**API連携**
- PokéAPI (RESTful API)
- 非同期データ取得
- エラーハンドリング

## 🎨 実装のポイント
- **パフォーマンス最適化**: 仮想スクロール・画像遅延読み込み
- **UX設計**: 直感的な検索・フィルタリングUI
- **データ管理**: API レスポンスの効率的なキャッシング
- **型安全性**: TypeScriptによる厳密な型定義

## 📚 学習成果
- RESTful API との連携方法
- React Hooksを用いた状態管理
- パフォーマンス最適化手法
- モダンなフロントエンド開発環境

## 🔗 リンク
- [🌐 デモサイト](https://sho0226.github.io/pokemon-app/)
- [📂 GitHub Repository](https://github.com/Sho0226/pokemon-app)
- [📝 開発記事](https://qiita.com/Sho0226/items/c6d497c6f62ff68399fa)

## 🎮 ユーザー体験
直感的な操作で、懐かしいポケモンから最新世代まで楽しく探索できる図鑑アプリ`,
      language: "markdown",
    },
    "Minesweeper.tsx": {
      content: `# 💣 Minesweeper - 論理思考パズルゲーム

## 🎮 ゲーム概要
隠された地雷を数字の手がかりから推理して見つけるクラシックなパズルゲーム

## ✨ ゲーム機能
- **難易度選択**: 初級・中級・上級の3段階
- **タイマー機能**: スピードクリアに挑戦
- **フラグ機能**: 地雷の位置をマーク
- **自動開拓**: 安全エリアの一括表示
- **統計記録**: 勝率・最短時間を記録

## 🧠 学習効果
- 論理的思考力の向上
- 確率計算能力の向上
- 集中力・忍耐力の養成

## 🔗 リンク
- [🎮 ゲームプレイ](https://sho0226.github.io/minesweeper/)
- [📂 GitHub Repository](https://github.com/Sho0226/minesweeper/)

## 🎯 攻略のコツ
数字の周りを注意深く観察し、確実に安全なマスから開いていこう！`,
      language: "markdown",
    },
    "Tetris.tsx": {
      content: `# 🧩 Tetris - 世界的パズルゲーム

## 🎮 ゲーム概要
落下するテトロミノ（ブロック）を回転・移動させて隙間なく積み上げるパズルゲーム

## ✨ ゲーム機能
- **7種類のテトロミノ**: I・O・T・L・J・S・Zブロック
- **ライン消去**: 完成した横一列を消去してスコア獲得
- **レベルアップ**: スコアに応じて落下速度が上昇
- **次ブロック表示**: 戦略的な配置計画が可能
- **ホールド機能**: ブロックを一時保管

## 🎯 ゲームの醍醐味
- 瞬時の判断力と空間認識能力を鍛える
- どんどん速くなる展開にドキドキ
- 完璧なライン消去の爽快感

## 🔗 リンク
- [🎮 ゲームプレイ](https://sho0226.github.io/Tetris/)
- [📂 GitHub Repository](https://github.com/Sho0226/Tetris/)

## 🏆 プレイのコツ
T-Spinや4ライン同時消去を狙って高得点を目指そう！`,
      language: "markdown",
    },
    "Breaking-blocks.tsx": {
      content: `# 🧱 Breaking Blocks - クラシックアーケードゲーム

## 🎮 ゲーム概要
パドルでボールを跳ね返してブロックを全て破壊するクラシックアーケードゲーム

## ✨ ゲーム機能
- **物理エンジン**: リアルなボールの動きと反射
- **特殊ブロック**: 強化ブロックやアイテムブロック
- **パワーアップ**: パドル拡大、マルチボールなど
- **ステージシステム**: 異なるレイアウトのステージ
- **スコアシステム**: 連続破壊ボーナス

## 🎯 ゲームの特徴
- 反射角度を計算した戦略的プレイ
- タイミングと集中力が要求される
- 簡単なルールで誰でも楽しめる

## 🔗 リンク
- [🎮 ゲームプレイ](https://sho0226.github.io/Breaking-blocks/)
- [📂 GitHub Repository](https://github.com/Sho0226/Breaking-blocks/)

## 🏆 攻略のコツ
角度を上手く利用して、一気に多くのブロックを崩そう！`,
      language: "markdown",
    },
    "Chess.tsx": {
      content: `# ♟️ Chess - 王のゲーム

## 🎮 ゲーム概要
1500年の歴史を持つ世界最高峰のボードゲームをWebで再現

## ✨ ゲーム機能
- **正式ルール**: FIDE公式ルールに完全準拠
- **特殊ルール**: キャスリング、アンパッサン、プロモーション
- **手番管理**: 白・黒の交代システム
- **動き検証**: 不正な手を自動でブロック
- **勝敗判定**: チェックメイト、ステイルメイトの自動判定

## 🧠 戦略的思考
- 長期的な計画性と瞬時の判断力
- 6種類の駒の特性を活かした戦術
- 無限の可能性を秘めた深いゲーム性

## 🔗 リンク
- [🎮 ゲームプレイ](https://sho0226.github.io/Chess/)
- [📂 GitHub Repository](https://github.com/Sho0226/Chess/)

## 🏆 チェスの魅力
世界中のプレイヤーが愛し、今なお進化し続ける永遠のゲーム`,
      language: "markdown",
    },
    "LightsOut.tsx": {
      content: `# 💡 Lights Out - ロジックパズルゲーム

## 🎮 ゲーム概要
点灯したライトをすべて消して、真っ暗な状態を作り出すロジックパズル

## ✨ ゲーム機能
- **連動システム**: 1つ押すと十字型に5個のライトが切り替わる
- **難易度選択**: 3x3から5x5までのグリッドサイズ
- **最少手数表示**: 効率的な解法を目指そう
- **ヒント機能**: どうしても解けない時のサポート
- **アニメーション**: 滑らかなライトの点滅エフェクト

## 🧠 数学的思考
- 線形代数の実践的応用
- パターン認識と逆算思考
- 系統的な問題解決アプローチ

## 🔗 リンク
- [🎮 ゲームプレイ](https://sho0226.github.io/LightsOut/)
- [📂 GitHub Repository](https://github.com/Sho0226/LightsOut/)

## 💡 解法のコツ
各マスの影響範囲を理解し、連動を逆算して考えよう！`,
      language: "markdown",
    },
    "Chronicle.tsx": {
      content: `# 📚 Chronicle - AI朗読・情景描写読書アプリ

## 🏆 受賞歴
**技育CAMP2024 7月Vol.8 努力賞受賞**

## 🎯 プロジェクト概要
青空文庫の名作小説を、AI技術で革新的な読書体験に変える次世代読書アプリケーション

## ✨ 主な機能
- **AI情景描写**: 各シーンにぴったりの美しい情景をAIが自動生成
- **合成音声朗読**: 自然な音声で物語を読み上げ
- **視聴覚融合体験**: 文字・音声・画像を組み合わせた没入感
- **青空文庫連携**: 豊富な名作小説ライブラリにアクセス
- **レスポンシブ対応**: デバイスを問わない読書環境

## 🛠️ 技術スタック
**フロントエンド**
- Next.js + TypeScript
- React + CSS Modules
- レスポンシブデザイン

**バックエンド**
- Fastify (高速API)
- Prisma ORM
- PostgreSQL
- Aspida (型安全API通信)

**AI・外部連携**
- AI画像生成API
- 音声合成API
- 青空文庫API

## 🎨 実装のポイント
- **AI統合**: 複数のAI APIを効率的に組み合わせ
- **パフォーマンス**: 音声・画像の非同期読み込み最適化
- **ユーザー体験**: 直感的な読書インターフェース
- **データ管理**: 効率的な小説データのキャッシング

## 🌟 イノベーション
従来の「読む」読書から「体験する」読書への変革を実現

## 📚 対象作品
- 夏目漱石「こころ」
- 芥川龍之介「羅生門」
- 宮沢賢治「銀河鉄道の夜」
- その他青空文庫収録作品

## 💡 今後の展望
- 多言語対応
- ユーザー投稿コンテンツ
- VR/AR対応による更なる没入体験`,
      language: "markdown",
    },
    "TsDaily.tsx": {
      content: `# 📖 TsDaily - 継続学習サポートアプリ

## 🎯 プロジェクト概要
毎日の学習習慣を身につけ、継続的なスキルアップを支援する学習管理アプリケーション

## ✨ 主な機能
- **学習記録**: 日々の学習内容と時間を簡単に記録
- **進捗可視化**: グラフとチャートで学習の進み具合を表示
- **習慣トラッキング**: 連続学習日数とストリーク管理
- **目標設定**: 週間・月間の学習目標を設定・追跡
- **振り返り機能**: 学習内容の復習と理解度チェック
- **モチベーション維持**: 達成バッジとリワードシステム

## 🛠️ 技術スタック
**フロントエンド**
- Next.js + TypeScript
- React (Hooks)
- レスポンシブUI設計

**データ管理**
- ローカルストレージ活用
- 学習データの永続化
- 効率的な状態管理

## 🎨 UX/UI 設計
- **シンプルデザイン**: 学習に集中できるミニマルUI
- **直感的操作**: ワンクリックで記録完了
- **視覚的フィードバック**: 進捗が一目で分かるダッシュボード
- **継続性重視**: 毎日使いたくなる仕組み

## 📊 学習分析機能
- 週間・月間学習時間の統計
- 学習分野別の進捗分析
- 最も効果的な学習時間帯の特定
- 学習継続率の可視化

## 🎓 学習効果
- 学習習慣の定着
- 進捗の見える化によるモチベーション向上
- 効率的な学習計画の立案
- 長期的なスキル向上の実現

## 💡 開発の目的
「継続は力なり」を実践し、誰もが学習を習慣化できるツールの提供`,
      language: "markdown",
    },
    "resume.pdf": {
      content: `# Resume

## Personal Information
Name: Your Name
Email: your.email@example.com
Phone: +81-90-xxxx-xxxx
Location: Tokyo, Japan

## Summary
Passionate frontend developer with expertise in modern web technologies.
Experienced in building responsive web applications using React, TypeScript, and Next.js.

## Skills
- Frontend: React, Next.js, TypeScript, JavaScript, HTML5, CSS3
- Backend: Node.js, Express, Fastify
- Database: PostgreSQL, MongoDB
- Tools: Git, Docker, AWS, Figma
- Languages: Japanese (Native), English (Business Level)

## Experience
### Frontend Developer | Current Company (2022 - Present)
- Developed responsive web applications using React and Next.js
- Collaborated with design teams to implement UI/UX designs
- Optimized application performance and accessibility

## Education
### Bachelor's Degree in Computer Science | University Name (2018 - 2022)
- Relevant coursework: Web Development, Database Systems, Software Engineering

## Projects
- Portfolio Website: Personal portfolio showcasing various projects
- E-commerce Platform: Full-stack web application with payment integration
- Task Management App: React-based application for team collaboration`,
      language: "markdown",
    },
  };

  const handleFileClick = (
    fileName: string,
    options?: { fromSearch?: boolean; switchToExplorer?: boolean }
  ) => {
    const fileContent = fileContents[fileName];
    if (!fileContent) return;

    // 検索からのクリックの場合、必要なフォルダを開く（ビュー切り替えは制御可能）
    if (options?.fromSearch) {
      // projects内のファイルの場合、projectsフォルダを開く
      const projectFiles = [
        "Othello.tsx",
        "Minesweeper.tsx",
        "Tetris.tsx",
        "Breaking-blocks.tsx",
        "Chess.tsx",
        "LightsOut.tsx",
        "TodoList.tsx",
        "AIHeadlines.tsx",
        "Chronicle.tsx",
        "花火大会オンライン.tsx",
        "ポケモン図鑑.tsx",
        "Fullstack-Template.tsx",
        "TsDaily.tsx",
      ];
      if (projectFiles.includes(fileName)) {
        setExpandedFolders((prev) => new Set([...prev, "projects"]));
      }
      // switchToExplorerが明示的にtrueの場合のみExplorerに切り替え
      if (options.switchToExplorer) {
        setActiveActivity("explorer");
      }
    }

    // 既にタブが開いているかチェック
    const existingTab = tabs.find((tab) => tab.id === fileName);
    if (existingTab) {
      setActiveTab(fileName);
      return;
    }

    // 新しいタブを追加
    const newTab: Tab = {
      id: fileName,
      name: fileName,
      content: fileContent.content,
      language: fileContent.language,
    };

    setTabs((prevTabs) => [...prevTabs, newTab]);
    setActiveTab(fileName);
  };

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };

  const handleTabClose = (tabId: string) => {
    const newTabs = tabs.filter((tab) => tab.id !== tabId);
    setTabs(newTabs);

    if (activeTab === tabId && newTabs.length > 0) {
      setActiveTab(newTabs[0].id);
    } else if (newTabs.length === 0) {
      setActiveTab("");
    }
  };

  const handleActivityChange = (activity: string) => {
    setActiveActivity(activity);
  };

  return (
    <div className={styles.vscodeLayout}>
      <ActivityBar
        activeActivity={activeActivity}
        onActivityChange={handleActivityChange}
      />
      {(activeActivity === "explorer" ||
        activeActivity === "search" ||
        activeActivity === "source-control" ||
        activeActivity === "extensions") && (
        <>
          <div
            className={styles.sidebarContainer}
            style={{ width: sidebarWidth }}
          >
            {activeActivity === "explorer" && (
              <Sidebar
                onFileClick={handleFileClick}
                expandedFolders={expandedFolders}
                setExpandedFolders={setExpandedFolders}
              />
            )}
            {activeActivity === "search" && (
              <SearchPanel
                onFileClick={(fileName) =>
                  handleFileClick(fileName, { fromSearch: true })
                }
              />
            )}
            {activeActivity === "source-control" && <SourceControlPanel />}
            {activeActivity === "extensions" && <ExtensionsPanel />}
          </div>
          <div className={styles.resizer} onMouseDown={handleMouseDown} />
        </>
      )}
      <MainEditor
        tabs={tabs}
        activeTab={activeTab}
        onTabClick={handleTabClick}
        onTabClose={handleTabClose}
        style={{
          width: `calc(100vw - 48px - ${
            activeActivity === "explorer" ||
            activeActivity === "search" ||
            activeActivity === "source-control" ||
            activeActivity === "extensions"
              ? sidebarWidth + 1
              : 0
          }px)`,
        }}
      />
    </div>
  );
}
