angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $state) {
  $scope.conditions = [
    'Allergic reaction',
    'Blurred Vision or slurred speech',
    'Broken bones',
    'Chest pain',
    'Confusion',
    'Coughing or vomiting blood',
    'Difficulty breathing',
    'Heavy bleeding from a cut or wound',
    'Head injury',
    'Severe burns',
    'Severe pain or headache',
    'Severe vomiting or diarrhea'
  ]

  $scope.selectedCondition = ''

  $scope.location = 'Grand Central Station, 89 East 42nd Street, New York, NY 10017'

  $scope.insuranceAgencies = [
    'AARP', 
    'Aetna', 
    'Age Well New York',
    'Amerihealth',
    'Anthem',
    'Blue Cross Blue Shield',
    "Children's Medical Services",
    'Cigna',
    'Elderplan',
    'Emblem Health',
    'GHI',
    'HIP',
    'Oscar',
    'United Healthcare',
    'United Healthcare Oxford',
    'N/A'
  ]

  $scope.goMap = function () {
    $state.go('tab.map')
  }
  
})

.controller('EmergencyCtrl', function ($scope) {
  $scope.symptoms = [
    'Allergic reaction',
    'Blurred Vision or slurred speech',
    'Broken bones',
    'Chest pain',
    'Confusion',
    'Coughing or vomiting blood',
    'Difficulty breathing',
    'Heavy bleeding from a cut or wound',
    'Head injury',
    'Severe burns',
    'Severe pain or headache',
    'Severe vomiting or diarrhea'
  ]
})

.controller('RegisterCtrl', function ($scope) {
  $scope.registrationForm = {
    'First Name': 'John',
    'Last Name': 'Doe',
    'Date of Birth': '00/00/00',
    'Home Phone': '',
    'Cell Phone': '',
    'Carrier Name': '',
    'Member Id': '',
    'Group Id': '',
    'Emergency Contact': '',
    'PCP Name': '',
    'PCP Phone': '',
    'Weight': '',
    'Height': '',
    "Blood Type": ''
  }
})

.controller('ContactsCtrl', function ($scope) {
  $scope.emergencyContacts = {
    "Mother": "111-222-3333",
    "Father": "222-333-4444"
  }
  $scope.familyAndFriendsContacts = {
    "Brother": "333-444-5555",
    "Boss": "444-555-6666"
  }
})

.controller('MapCtrl', function ($scope, $ionicLoading, $state) {

  $scope.hospitals = {
    'MedRite Urgent Care': {
      'type': 'Urgent Care Facility',
      'address': '919 2nd Ave, New York, NY 10017',
      'distance': '0.6 Mile',
      'time': '5 Minutes',
      'waitTime': '16 Minutes',
      'phone': '(212) 935-3333',
      'hours': '8:00 am – 10:00 pm'
    },
    'Walk-In Clinic of NYC': {
      'type': 'Walk-in Clinic',
      'address': '274 Madison Ave #304a, New York, NY 10016',
      'distance': '0.3 Mile',
      'time': '5 Minutes',
      'waitTime': '23 Minutes',
      'phone': '(212) 686-5800',
      'hours': 'Opens at 9:00 am'
    },
    'CityMD': {
      'type': 'Urgent Care Facility',
      'address': '1345 6th Ave, New York, NY',
      'distance': '0.8 Mile',
      'time': '12 Minutes',
      'waitTime': '12 Minutes',
      'phone': '(212) 913-0828',
      'hours': 'Not Available'
    }
  }

  

  google.maps.event.addDomListener(window, 'load', function() {
        var directionsDisplay = new google.maps.DirectionsRenderer();
        var directionsService = new google.maps.DirectionsService();
        var myLatlng = new google.maps.LatLng(40.7528, -73.9765);
 
        var mapOptions = {
            center: myLatlng,
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        
        // navigator.geolocation.getCurrentPosition(function(pos) {
        //     map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
        //     var myLocation = new google.maps.Marker({
        //         position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
        //         map: map,
        //         title: "My Location"
        //     });
        //     myLatlng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude)

            
        // });

        $scope.selectHospital = function (hospital) {
          var request = {
              origin: myLatlng,
              destination: hospital,
              travelMode: google.maps.TravelMode.DRIVING
          };
          directionsService.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
              console.log(response)
              directionsDisplay.setDirections(response);
            }
          });
        }

        var map = new google.maps.Map(document.getElementById("map"), mapOptions);
        directionsDisplay.setMap(map);

        var myLocation = new google.maps.Marker({
          position: new google.maps.LatLng(40.7528, -73.9765),
          map: map,
          title: "Grand Central Station"
        })

        map.setCenter(new google.maps.LatLng(40.7528, -73.9765))
 
        $scope.map = map;
    });

  $scope.goRegister = function () {
    $state.go('tab.register')
  }

})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
