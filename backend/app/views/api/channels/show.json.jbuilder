channel = local_assigns[:channel] || @channel

json.id channel.id
json.name channel.name
json.workspace_id channel.workspace_id
json.created_at channel.created_at
json.updated_at channel.updated_at
