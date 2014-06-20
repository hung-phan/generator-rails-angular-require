# Template support
<% if (includeHaml) { %>
# For HAML or other Tilt-compatible engine, use Tilt's adapters
Rails.application.assets.register_engine('.haml', Tilt::HamlTemplate)<% } %><% if (includeSlim) { %>
# For Slim, remember also to add gem to Gemfile
Rails.application.assets.register_engine('.slim', Slim::Template)<% } %>
