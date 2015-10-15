json.families @groups do |group|
  json.extract! group, :id, :name
end
