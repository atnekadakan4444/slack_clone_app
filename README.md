  変更内容まとめ

  1. src/lib/api/index.ts — fetchベースのAPIクライアントに書き換え

  - get, post, delete, postForm, putForm メソッドを提供
  - 認証トークンの付与はインターセプターではなく getHeaders() 関数で実現
  - axiosと同じ { data, status } 形式でレスポンスを返すため、リポジトリファイル側の変更は不要

  2. src/lib/api/interceptors/request.ts — 削除

  - 認証ロジックは getHeaders() に統合済み

  3. src/modules/messages/message.entity.ts — 未使用の import api を削除

  4. axios パッケージをアンインストール

  リポジトリファイル（auth, account, channels, messages, workspaces, users,
  workspace-users）は、APIクライアントのインターフェースを同じに保ったため、変更なしでそのまま動作します。
