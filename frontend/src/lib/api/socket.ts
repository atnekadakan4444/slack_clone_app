import { createConsumer, type Subscription } from "@rails/actioncable";
import { Message } from "../../modules/messages/message.entity";

const baseURL = import.meta.env.VITE_API_URL;
const consumer = createConsumer(`${baseURL}/cable`);

let currentSubscription: Subscription | null = null;

export const subscribe = (
  workspaceId: string,
  onNewMessage: (message: any) => void,
  onDeleteMessage: (messageId: string) => void,
) => {
  // 既存のサブスクリプションがあれば解除
  if (currentSubscription) {
    currentSubscription.unsubscribe();
  }

  currentSubscription = consumer.subscriptions.create(
    { channel: "WorkspaceChannel", workspace_id: workspaceId },
    {
      received(data: { type: string; message?: Message; messageId?: string }) {
        switch (data.type) {
          case "new-message":
            if (data.message) {
              onNewMessage(new Message(data.message));
            }
            break;
          case "delete-message":
            if (data.messageId) {
              onDeleteMessage(data.messageId);
            }
            break;
        }
      },
    },
  );
};

export const unsubscribe = (_workspaceId: string) => {
  if (currentSubscription) {
    currentSubscription.unsubscribe();
    currentSubscription = null;
  }
};
