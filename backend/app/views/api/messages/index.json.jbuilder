json.array! @messages do |message|
  json.id message.id
  json.content message.content
  json.image_url message.image_url
  json.created_at message.created_at
  json.updated_at message.updated_at
  json.user do
    json.id message.user.id
    json.name message.user.name
    json.thumbnail_url message.user.thumbnail_url
  end
end
