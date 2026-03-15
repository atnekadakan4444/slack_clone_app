# 依頼内容
現在 Express で実装されている @slack-clone-api/ のバックエンド機能を、最新の **Ruby on Rails 8 (APIモード)** で再構築（リプレイス）し、@backend/ ディレクトリ配下に作成してください。

# 技術要件
1. **フレームワーク・環境**
   - Rails 8 (`rails new . --api` ベース)
   - データベース: PostgreSQL
   - ディレクトリ: すべてのファイルを @backend/ 直下に配置

2. **認証システム (devise + devise-jwt)**
   - **HttpOnlyクッキーパターン** で実装してください。
   - JWTはレスポンスの **HttpOnlyクッキー**（`Secure`, `SameSite=Lax`等）として送信し、クライアント側のJSからはアクセスできないようにしてください。
   - リクエスト時には、クッキーから自動的にJWTを抽出して認証を行うよう `devise-jwt` を構成してください。
   - JWTの失効（Revocation）戦略には `JTIMatcher` を使用してください。

3. **移行・実装方針**
   - @slack-clone-api/ 内の各エンドポイント、DBスキーマ、ビジネスロジックを解析し、Railsの慣習（Fat Model / Skinny Controller）に沿って移植してください。
   - APIモードでクッキーを扱うために必要なミドルウェアや `rack-cors` の設定も含めてください。

# アウトプットのステップ
いきなりコードを生成するのではなく、以下の手順で進めてください。

1. **解析と設計の提示:**
   - Expressの各ルートが Rails のどの Controller/Action に対応するか。
   - `devise-jwt` で HttpOnlyクッキーを実現するための具体的な実装方針（Warden hooks や Dispatcher のカスタマイズ等）の概要。
   - 導入が必要な Gem の一覧。

2. **実装コードの生成:**
   - 上記の設計案に対し、私が合意してから実際のコード生成を開始してください。
