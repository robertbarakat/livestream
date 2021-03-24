import React from 'react';
import { Dimensions, View, Button, PermissionsAndroid, SafeAreaView } from "react-native";
import { NodeCameraView } from "react-native-nodemediaclient";

const { width, height } = Dimensions.get("window");

const config = {
  cameraConfig: {
    cameraId: 1,
    cameraFrontMirror: false
  },
  videoConfig: {
    preset: 4,
    bitrate: 2000000,
    profile: 2,
    fps: 30,
    videoFrontMirror: true,
  },
  audioConfig: {
    bitrate: 128000,
    profile: 1,
    samplerate: 44100,
  }
};

const App = () => {
  const cameraViewRef = React.useRef(null);

  const requestCameraPermission = async () => {

    const granted = await PermissionsAndroid.requestMultiple([PermissionsAndroid.PERMISSIONS.CAMERA, PermissionsAndroid.PERMISSIONS.RECORD_AUDIO],
      {
        title: "Cool Photo App Camera And Microphone Permission",
        message:
          "Cool Photo App needs access to your camera " +
          "so you can take awesome pictures.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    );
    console.log(granted)
    console.log(cameraViewRef)
    return granted
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>

      <View>
        <Button title="request permissions" onPress={requestCameraPermission} />
        <Button
          onPress={() => { cameraViewRef.current.start() }}
          title="Play"
          color="#841584"
        />
        <Button
          onPress={() => { cameraViewRef.current.stop() }}
          title="Stop"
          color="#841584"
        />
      </View>
      <View>
        <NodeCameraView
          style={{ width, height }}
          ref={cameraViewRef}
          outputUrl={'rtmp://35.204.161.138/live/test-rob'}
          camera={config.cameraConfig}
          audio={config.audioConfig}
          video={config.videoConfig}
          autopreview={true}
        />
      </View>

    </SafeAreaView>
  );
};

export default App;