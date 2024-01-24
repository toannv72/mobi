// index.js
import { AppRegistry } from 'react-native';
import App from '../../App';
import { name as appName } from '../../app.json';

import { firebaseConfig } from './firebaseConfig.js'; // Import cấu hình Firebase
import { configureFirebaseStorage } from './firebase'; // Import hàm cấu hình Firebase Storage
import { firebase } from '@react-native-firebase/storage';

// Cấu hình Firebase Storage
configureFirebaseStorage();

// Khởi tạo Firebase
firebase.initializeApp(firebaseConfig);

AppRegistry.registerComponent(appName, () => App);
