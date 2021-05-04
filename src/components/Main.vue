<template>
  <v-container class="pt-0 pb-0">
    <v-row no-gutters style="height: 100vh" class="pt-0 pb-0">
      <v-col align-self="center">
        <div class="mx-auto">
          <div class="pb-16 pt-8">
            <h1 class="text-h2 mb-4 font-weight-medium text-center">
              Otaku Tools
            </h1>
            <h2 class="font-weight-medium text-center">肥宅工具箱</h2>
          </div>
          <div class="pt-16">
            <v-row no-gutters>
              <v-col align-self="center" align="middle">
                <v-dialog max-width="600">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      v-bind="attrs"
                      v-on="on"
                      elevation="2"
                      x-large
                      color="info"
                      style="width: 200px"
                      >发 送</v-btn
                    >
                  </template>
                  <template v-slot:default="dialog">
                    <v-card>
                      <v-card-text class="pa-4">
                        <v-tabs fixed-tabs v-model="uploadTab">
                          <v-tab>文本</v-tab>
                          <v-tab>文件</v-tab>
                        </v-tabs>
                        <v-tabs-items class="mt-4" v-model="uploadTab">
                          <v-tab-item>
                            <v-textarea
                              label="文本内容"
                              auto-grow
                              value=""
                            ></v-textarea>
                          </v-tab-item>
                          <v-tab-item>
                            <v-file-input
                              counter
                              show-size
                              truncate-length="20"
                            ></v-file-input>
                          </v-tab-item>
                        </v-tabs-items>
                      </v-card-text>
                      <v-card-actions class="justify-end">
                        <v-btn text @click="dialog.value = false">取消</v-btn>
                        <v-btn
                          color="primary"
                          text
                          @click="dialog.value = false"
                          >上传</v-btn
                        >
                      </v-card-actions>
                    </v-card>
                  </template>
                </v-dialog>
              </v-col>
            </v-row>
            <v-row>
              <v-col align-self="center" align="middle">
                <v-dialog max-width="600">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      v-bind="attrs"
                      v-on="on"
                      elevation="2"
                      x-large
                      color="light-blue lighten-2"
                      style="width: 200px"
                      dark
                      >接 收</v-btn
                    >
                  </template>
                  <template v-slot:default="dialog">
                    <v-card>
                        <v-card-title class="font-weight-medium">请输入下载码</v-card-title>
                      <v-card-text>
                        <v-text-field label="下载码"></v-text-field>
                      </v-card-text>
                      <v-card-actions class="justify-end">
                        <v-btn text @click="dialog.value = false">取消</v-btn>
                        <v-btn
                          color="primary"
                          text
                          @click="dialog.value = false"
                          >下载</v-btn
                        >
                      </v-card-actions>
                    </v-card>
                  </template>
                </v-dialog>
              </v-col>
            </v-row>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.hide-scrollbar {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>

<script>
export default {
  name: "Main",
  data() {
    return {
      mode: "send",
      uploadTab: null,
    };
  },
  methods: {
    uploadFile() {},

    downloadFile() {},
  },
};
</script>