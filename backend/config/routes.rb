Rails.application.routes.draw do
  # Devise 認証ルート（カスタムコントローラー使用）
  devise_for :users,
    path: "auth",
    path_names: {
      sign_in: "signin",
      sign_out: "signout",
      registration: "signup"
    },
    controllers: {
      sessions: "users/sessions",
      registrations: "users/registrations"
    }

  # API ルート
  namespace :api do
    # 現在のユーザー情報取得
    get "me", to: "current_users#show"

    # アカウント（プロフィール更新）
    resource :account, only: [:update]

    # ユーザー検索
    resources :users, only: [:index]

    # ワークスペース
    resources :workspaces, only: [:index, :show, :create, :update, :destroy] do
      # ワークスペースメンバー追加
      resources :workspace_users, only: [:create]

      # チャンネル（ワークスペース配下）
      resources :channels, only: [:index, :show, :create, :destroy] do
        # メッセージ（チャンネル配下）
        resources :messages, only: [:index, :create, :destroy] do
          collection do
            post :create_image
          end
        end
      end
    end
  end

  # Action Cable
  mount ActionCable.server => "/cable"
end
