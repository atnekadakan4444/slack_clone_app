import { useEffect, useState } from "react";
import { useUiStore } from "../../../modules/ui/ui.state";
import type { User } from "../../../modules/users/user.entity";
import { userRepository } from "../../../modules/users/user.repository";
import { useDebouncedCallback } from "use-debounce";

function UserSearchModal() {
  const { setShowUserSearchModal, showUserSearchModal } = useUiStore();
  const [keyword, setKeyword] = useState("");
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const searchUsers = async () => {
    if (keyword == "") {
      setSearchResults([]);
      return;
    }
    setIsLoading(true);
    try {
      const users = await userRepository.find(keyword);
      // setSearchResults(users);
      console.log(users);
    } catch (error) {
      console.error("ユーザーの検索に失敗しました:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const debouncedSearch = useDebouncedCallback(searchUsers, 500);

  useEffect(() => {
    debouncedSearch();
  }, [keyword]);

  return (
    <div
      className="modal-overlay"
      onClick={() => setShowUserSearchModal(false)}
    >
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>メンバーを招待する</h2>
          <button
            className="close-button"
            onClick={() => setShowUserSearchModal(false)}
          >
            ×
          </button>
        </div>

        <div className="modal-content">
          <div className="invite-form">
            <label htmlFor="invite-input">招待するメンバー：</label>
            <div className="selected-users-container">
              <div key={1} className="selected-user-chip">
                <img
                  src={
                    "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
                  }
                  alt={"test"}
                  className="user-avatar small"
                />
                <span>{"test"}</span>
                <button className="remove-user-button">×</button>
              </div>
              <input
                type="text"
                id="invite-input"
                className="invite-input"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>
          </div>
          <div className="user-suggestions">
            return (
            <div key={1} className={`user-suggestion-item`}>
              <img
                src={
                  "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
                }
                alt={"test"}
                className="user-avatar"
              />
              <div className="user-info">
                <div className="user-name">{"test"}</div>
                <div className="user-email">{"test@test.com"}</div>
              </div>
            </div>
            );
          </div>

          <div className="modal-footer">
            <button className="invite-button">招待する</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserSearchModal;
function useDebouncedeCallback(searchUsers: () => Promise<void>, arg1: number) {
  throw new Error("Function not implemented.");
}
