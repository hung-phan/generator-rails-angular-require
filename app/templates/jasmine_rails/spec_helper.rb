module JasmineRails
  module SpecHelper
    include ActionView::Helpers::JavaScriptHelper
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

    def asset_to_s path
      Rails.application.assets[path].body.html_safe
    end

    def templates
      Hash[
        Rails.application.assets.each_logical_path.
        select { |file| file.end_with?('tpl.html') }.
        map { |file| [file, ActionController::Base.helpers.asset_path(file)] }
      ]
    end
  end
end
