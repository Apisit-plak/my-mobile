import "dotenv/config";

export default {
  expo: {
    extra: {
      googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
      eas: {
        projectId: "a6dad378-d3d9-4eae-8c98-bc29dc4e8569",
      },
    },
    android: {
      package: "com.apisit.mymobile", // ✅ ไม่มีเครื่องหมาย '-'
    },
  },
};
