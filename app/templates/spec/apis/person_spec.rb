require 'rails_helper'

describe 'APIS::V1::PersonApi' do
  describe 'GET /api/v1/people' do
    it 'should get an array of people' do
      get '/api/v1/people'

      expect_json_types :array
      expect_json('0', {
        firstName: 'John',
        lastName: 'Smith',
        age: 25,
        address: {
          streetAddress: '21 2nd Street',
          city: 'New York',
          state: 'NY',
          postalCode: '10021'
        },
        phoneNumber: [
          {
            type: 'home',
            number: '212 555-1234'
          },
          {
            type: 'fax',
            number: '646 555-4567'
          }
        ]
      })
    end
  end
end
