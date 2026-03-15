json.array! @workspaces do |workspace|
  json.id workspace.id
  json.name workspace.name
  json.admin_user_id workspace.admin_user_id
  json.created_at workspace.created_at
  json.updated_at workspace.updated_at
end
