module API
  module V1
    class Base < Grape::API
      # base api for v1
      mount API::V1::ObjectApi
    end
  end
end

