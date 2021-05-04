<template>
  <v-container class="pt-0 pb-0">
    <v-row no-gutters style="height: 100vh" class="pt-0 pb-0">
      <v-col align-self="center">
        <div class="mx-auto">
          <div class="pb-16 pt-8">
            <h1 class="text-h2 mb-8 font-weight-medium text-center">
              <v-icon size="150">mdi-rotate-3d-variant</v-icon>
            </h1>
            <h2 class="font-weight-medium text-center">Quick Transfer</h2>
          </div>
          <div class="pt-12">
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
                        <v-tabs fixed-tabs v-model="uploadType">
                          <v-tab >文本</v-tab>
                          <v-tab>文件</v-tab>
                        </v-tabs>
                        <v-tabs-items class="mt-4" v-model="uploadType">
                          <v-tab-item>
                            <v-textarea
                              label="文本内容"
                              auto-grow
                              value=""
                              v-model="uploadText"
                            ></v-textarea>
                          </v-tab-item>
                          <v-tab-item>
                            <v-file-input
                              counter
                              show-size
                              truncate-length="20"
                              v-model="uploadObj"
                            ></v-file-input>
                          </v-tab-item>
                        </v-tabs-items>
                      </v-card-text>
                      <v-card-actions class="justify-end">
                        <v-btn text @click="dialog.value = false">取消</v-btn>
                        <v-btn
                          color="primary"
                          text
                          :loading="isUploading"
                          @click="() => { uploadFile(); dialog.value = false }"
                          >上传</v-btn
                        >
                        <v-dialog
                          v-model="uploadDialogVisible"
                          max-width="400px"
                        >
                          <v-card>
                            <v-card-title>
                              上传成功
                            </v-card-title>
                            <v-card-text>
                              下载码：{{resCode}}
                            </v-card-text>
                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn
                                color="primary"
                                text
                                @click="uploadDialogVisible = false"
                              >
                                确认
                              </v-btn>
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
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
                        <v-text-field label="下载码" v-model="downloadCode"></v-text-field>
                      </v-card-text>
                      <v-card-actions class="justify-end">
                        <v-btn text @click="dialog.value = false">取消</v-btn>
                        <v-btn
                          color="primary"
                          text
                          :loading="isDownloading"
                          @click="() => { downloadFile(); dialog.value = false }"
                          >下载</v-btn
                        >
                        <v-dialog
                          v-model="downloadDialogVisible"
                          max-width="400px"
                        >
                          <v-card>
                            <v-card-title>
                              内容
                            </v-card-title>
                            <v-card-text>
                              <p v-if="downloadInfo.type === 'text'">
                                {{downloadInfo.content}}
                              <p>
                              <div v-if="downloadInfo.type === 'url'">
                                <a download :href="downloadInfo.content">点击下载文件</a>
                              </div>
                            </v-card-text>
                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn
                                color="primary"
                                text
                                @click="downloadDialogVisible = false"
                              >
                                确认
                              </v-btn>
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
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
</style>

<script>
export default {
  name: "Main",
  data() {
    return {
      mode: "send",
      uploadType: null,

      isUploading: false,
      isDownloading: false,

      uploadText: '',
      uploadObj: null,

      downloadCode: null,
      downloadInfo: {},

      uploadDialogVisible: false,
      downloadDialogVisible: false,

      resCode: null,
    };
  },
  methods: {
    async uploadFile() {
      if (this.uploadType === 0) {
        // 传文本
        this.isUploading = true;
        const res = await window.axios({
          method: 'post',
          url: 'https://file-transfer-2gp4f8q0ad4eda34-1252809026.ap-guangzhou.app.tcloudbase.com/cgi',
          responseType: 'json',
          data: {
            type: 'text',
            cmd: 'setData',
            content: this.uploadText
          }
        })
        this.isUploading = false;
        this.resCode = res.data.code;
        this.uploadDialogVisible = true;
      } else {
        // 初始化实例
        const cos = new window.COS({
          getAuthorization: async function (options, callback) {
            // 异步获取临时密钥
            const res = await window.axios({
              method: 'post',
              url: 'https://file-transfer-2gp4f8q0ad4eda34-1252809026.ap-guangzhou.app.tcloudbase.com/cgi',
              responseType: 'json',
              data: {
                cmd: 'getToken'
              }
            })
            const data = res.data;
            const credentials = data && data.credentials;
            if (!data || !credentials) return console.error('credentials invalid');
            callback({
              TmpSecretId: credentials.tmpSecretId,
              TmpSecretKey: credentials.tmpSecretKey,
              XCosSecurityToken: credentials.sessionToken,
              // 建议返回服务器时间作为签名的开始时间，避免用户浏览器本地时间偏差过大导致签名错误
              StartTime: data.startTime, // 时间戳，单位秒，如：1580000000
              ExpiredTime: data.expiredTime, // 时间戳，单位秒，如：1580000900
            });
          }
        });

        this.isUploading = true;
        cos.putObject({
          Bucket: 'file-transfer-1252809026', /* 必须 */
          Region: 'ap-guangzhou',     /* 存储桶所在地域，必须字段 */
          Key: this.uploadObj.name,              /* 必须 */
          StorageClass: 'STANDARD',
          Body: this.uploadObj, // 上传文件对象
          onProgress: function(progressData) {
            console.log(JSON.stringify(progressData));
          }
        }, async (err, data) => {
          if (!err) {
            // 传文本
            const res = await window.axios({
              method: 'post',
              url: 'https://file-transfer-2gp4f8q0ad4eda34-1252809026.ap-guangzhou.app.tcloudbase.com/cgi',
              responseType: 'json',
              data: {
                type: 'url',
                cmd: 'setData',
                content: 'https://' + data.Location
              }
            })
            this.isUploading = false;
            this.resCode = res.data.code;
            this.uploadDialogVisible = true;
          } 
        });
      }
    },

    async downloadFile() {
      this.isDownloading = true;
      const res = await window.axios({
        method: 'post',
        url: 'https://file-transfer-2gp4f8q0ad4eda34-1252809026.ap-guangzhou.app.tcloudbase.com/cgi',
        responseType: 'json',
        data: {
          cmd: 'getData',
          content: Number(this.downloadCode)
        }
      })
      const data = res.data
      const url = data.url
      if (url.length) {
        this.downloadInfo = url[0];
      } else {
        this.downloadInfo = {
          content: '404 not found',
          type: 'text'
        };
      }
      this.downloadDialogVisible = true;
      this.isDownloading = false;
    },
  },
};
</script>