module JasmineRails
  module SpecHelper
    # Gives us access to the require_js_include_tag helper
    include RequirejsHelper

    def spec_files
      files = Jasmine::Core.js_files
      files += JasmineRails.reporter_files params[:reporters]
      files << 'jasmine-specs.js'
      files.map do |file|
        file = file.split '.'
        file.pop()
        file[0]
      end
    end
  end
end

