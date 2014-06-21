module JasmineRails
  module SpecHelper
    # Gives us access to the require_js_include_tag helper
    include RequirejsHelper

    def spec_files
      spec_files = []
      env = Rails.application.assets
      env.each_logical_path do |lp|
        if lp =~ %r{^spec/.*_unitspec\.js$}
          file_name = lp.split "."
          file_name.pop()
          spec_files << (file_name.join ".")
        end
      end
      spec_files
    end

    def template_inject
      template_files = []
      env = Rails.application.assets
      env.each_logical_path do |lp|
        if lp =~ %r{^**/.*\.tpl\.html$}
          angular_module = "angular.module(#{lp}).run(['$templateCache', function($templateCache) {
            $templateCache.put(#{asset_path lp}, '#{Rails.application.assets[lp].to_s}');
          }]);"
          template_files << angular_module
        end
      end
      template_files
    end
  end
end
