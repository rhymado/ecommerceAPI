'use strict';

const Profile = use ('App/Models/Profile');

class ProfileController {
  async show({params, request, response, view}) {
    try {
      const profile = await Profile.find (params.id);
      return response.json (profile);
    } catch (error) {
      console.log (error);
    }
  }
  async store({request, response}) {
    try {
      const profileData = request.only ([
        'username',
        'profile_name',
        'image',
        'address',
        'postal_code',
      ]);
      const profile = new Profile ();
      profile.username = profileData.username;
      profile.profile_name = profileData.profile_name;
      profile.image = profileData.image;
      profile.address = profileData.address;
      profile.postal_code = profileData.postal_code;
      await profile.save ();
      return response.status (201).json (profile);
    } catch (error) {
      console.log (error);
    }
  }
  async update({params, request, response}) {
    try {
      const profileData = request.only ([
        'profile_name',
        'image',
        'address',
        'postal_code',
      ]);
      const profile = await Profile.find (params.id);
      profile.profile_name = profileData.profile_name;
      profile.image = profileData.image;
      profile.address = profileData.address;
      profile.postal_code = profileData.postal_code;
      await profile.save ();
      return response.status (200).json (profile);
    } catch (error) {
      console.log (error);
      return response.status (404).json ({data: 'Profile not found'});
    }
  }
  async destroy({params, request, response}) {
    try {
      const profile = await Profile.find (params.id);
      await profile.delete ();
      return response.status (204).json (null);
    } catch (error) {
      console.log (error);
      return response.status (404).json ({data: 'Profile not found'});
    }
  }
}

module.exports = ProfileController;
