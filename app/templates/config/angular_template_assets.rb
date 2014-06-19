# For HAML or other Tilt-compatible engine, use Tilt's adapters
Rails.application.assets.register_engine('.haml', Tilt::HamlTemplate)
