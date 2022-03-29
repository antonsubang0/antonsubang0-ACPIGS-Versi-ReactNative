import RNFetchBlob from 'rn-fetch-blob';
import {getDataStorage} from '../storage';

const APP_URL = 'https://cpi-cloud.my.id/api';

const formData = (data, id, value) => {
  return {
    ...data,
    [id]: value,
  };
};

const httpProfile = () => {
  return new Promise(async (resolve, reject) => {
    const headertemp = await getDataStorage('kunci');
    if (!headertemp) {
      return resolve(null);
    }
    const header = JSON.parse(headertemp);
    return fetch(`${APP_URL}/user/info`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + header.token,
      },
    })
      .then(res => res.json())
      .then(json => {
        resolve(json);
      })
      .catch(() => {
        resolve({
          status: 404,
          error: 404,
          messages: {
            error: 'Network Error',
          },
        });
      });
  });
};

const httpBarcode = async () => {
  const headertemp = await getDataStorage('kunci');
  if (!headertemp) {
    return null;
  }
  const header = JSON.parse(headertemp);
  return fetch(`${APP_URL}/user/barcode`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + header.token,
    },
  })
    .then(res => res.json())
    .then(json => {
      return json;
    })
    .catch(() => {
      return {
        status: 404,
        error: 404,
        messages: {
          error: 'Network Error',
        },
      };
    });
};

const httpCuti = async () => {
  const headertemp = await getDataStorage('kunci');
  if (!headertemp) {
    return null;
  }
  const header = JSON.parse(headertemp);
  return fetch(`${APP_URL}/user/cuti`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + header.token,
    },
  })
    .then(res => res.json())
    .then(json => {
      return json;
    })
    .catch(() => {
      return {
        status: 404,
        error: 404,
        messages: {
          error: 'Network Error',
        },
      };
    });
};

const httpSakit = async () => {
  const headertemp = await getDataStorage('kunci');
  if (!headertemp) {
    return null;
  }
  const header = JSON.parse(headertemp);
  return fetch(`${APP_URL}/user/sakit`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + header.token,
    },
  })
    .then(res => res.json())
    .then(json => {
      return json;
    })
    .catch(() => {
      return {
        status: 404,
        error: 404,
        messages: {
          error: 'Network Error',
        },
      };
    });
};

const httpIjin = async () => {
  const headertemp = await getDataStorage('kunci');
  if (!headertemp) {
    return null;
  }
  const header = JSON.parse(headertemp);
  return fetch(`${APP_URL}/user/ijin`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + header.token,
    },
  })
    .then(res => res.json())
    .then(json => {
      return json;
    })
    .catch(() => {
      return {
        status: 404,
        error: 404,
        messages: {
          error: 'Network Error',
        },
      };
    });
};

const httpGaji = async () => {
  const headertemp = await getDataStorage('kunci');
  if (!headertemp) {
    return null;
  }
  const header = JSON.parse(headertemp);
  return fetch(`${APP_URL}/user/gaji`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + header.token,
    },
  })
    .then(res => res.json())
    .then(json => {
      return json;
    })
    .catch(() => {
      return {
        status: 404,
        error: 404,
        messages: {
          error: 'Network Error',
        },
      };
    });
};

const httpLogin = (email, password, imei) => {
  return new Promise((resolve, reject) => {
    fetch(`${APP_URL}/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
        imei: imei,
      }),
    })
      .then(res => res.json())
      .then(json => resolve(json))
      .catch(() =>
        resolve({
          status: 404,
          error: 404,
          messages: {
            error: 'Network Error',
          },
        }),
      );
  });
};

const httpEmail = email => {
  return new Promise(async (resolve, reject) => {
    const header = JSON.parse(await getDataStorage('kunci'));
    fetch(`${APP_URL}/changeemail`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + header.token,
      },
      body: JSON.stringify({
        email: email,
      }),
    })
      .then(res => res.json())
      .then(json => resolve(json))
      .catch(() =>
        resolve({
          status: 404,
          error: 404,
          messages: {
            error: 'Network Error',
          },
        }),
      );
  });
};

const httpLupaPassword = email => {
  return new Promise(async (resolve, reject) => {
    fetch(`${APP_URL}/forgot`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
      }),
    })
      .then(res => res.json())
      .then(json => resolve(json))
      .catch(() =>
        resolve({
          status: 404,
          error: 404,
          messages: {
            error: 'Network Error',
          },
        }),
      );
  });
};

const httpCode = code => {
  return new Promise(async (resolve, reject) => {
    const header = JSON.parse(await getDataStorage('kunci'));
    fetch(`${APP_URL}/aktivasiemail`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + header.token,
      },
      body: JSON.stringify({
        code: code,
      }),
    })
      .then(res => res.json())
      .then(json => resolve(json))
      .catch(() =>
        resolve({
          status: 404,
          error: 404,
          messages: {
            error: 'Network Error',
          },
        }),
      );
  });
};

const httpGantiPhoto = upload => {
  return new Promise(async (resolve, reject) => {
    // console.log(upload);
    const header = JSON.parse(await getDataStorage('kunci'));
    fetch(`${APP_URL}/user/gantiphoto`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + header.token,
      },
      body: JSON.stringify({
        upload: upload,
      }),
    })
      .then(res => res.json())
      .then(json => resolve(json))
      .catch(() =>
        resolve({
          status: 404,
          error: 404,
          messages: {
            error: 'Network Error',
          },
        }),
      );
  });
};

const httpPCuti = (tanggal, keperluan) => {
  return new Promise(async (resolve, reject) => {
    const header = JSON.parse(await getDataStorage('kunci'));
    const tgl = String(tanggal).split(' - ');
    const tglFinal = new Date(tgl[2], tgl[1], tgl[0], 10, 33, 30, 0);
    console.log(tgl);
    fetch(`${APP_URL}/user/cuti`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + header.token,
      },
      body: JSON.stringify({
        tgl_cuti: tglFinal,
        keperluan: keperluan,
      }),
    })
      .then(res => res.json())
      .then(json => resolve(json))
      .catch(() =>
        resolve({
          status: 404,
          error: 404,
          messages: {
            error: 'Network Error',
          },
        }),
      );
  });
};

const httpPijin = (tanggal, keperluan) => {
  return new Promise(async (resolve, reject) => {
    const header = JSON.parse(await getDataStorage('kunci'));
    const tgl = String(tanggal).split(' - ');
    const tglFinal = new Date(tgl[2], tgl[1], tgl[0], 10, 33, 30, 0);
    fetch(`${APP_URL}/user/ijin`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + header.token,
      },
      body: JSON.stringify({
        tanggal: tglFinal,
        keperluan: keperluan,
      }),
    })
      .then(res => res.json())
      .then(json => resolve(json))
      .catch(() =>
        resolve({
          status: 404,
          error: 404,
          messages: {
            error: 'Network Error',
          },
        }),
      );
  });
};

const httpPsakit = (tanggal, upload) => {
  return new Promise(async (resolve, reject) => {
    // console.log(upload);
    const header = JSON.parse(await getDataStorage('kunci'));
    const tgl = String(tanggal).split(' - ');
    const tglFinal = new Date(tgl[2], tgl[1], tgl[0], 10, 33, 30, 0);
    const uploadFinal = upload.split(' ')[1];
    fetch(`${APP_URL}/user/sakit`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + header.token,
      },
      body: JSON.stringify({
        tgl_sakit: tglFinal,
        upload: uploadFinal,
      }),
    })
      .then(res => res.json())
      .then(json => resolve(json))
      .catch(() =>
        resolve({
          status: 404,
          error: 404,
          messages: {
            error: 'Network Error',
          },
        }),
      );
  });
};

const httpYamikuInfo = () => {
  return new Promise(async (resolve, reject) => {
    const headertemp = await getDataStorage('kunci');
    if (!headertemp) {
      resolve(null);
    }
    const header = JSON.parse(headertemp);
    return fetch(`${APP_URL}/yamiku/info`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + header.token,
      },
    })
      .then(res => res.json())
      .then(json => {
        resolve(json);
      })
      .catch(() => {
        resolve({
          status: 404,
          error: 404,
          messages: {
            error: 'Network Error',
          },
        });
      });
  });
};

const httpAmbilBarcode = barcode => {
  return new Promise(async (resolve, reject) => {
    // console.log(upload);
    const header = JSON.parse(await getDataStorage('kunci'));
    fetch(`${APP_URL}/yamiku/barcode`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + header.token,
      },
      body: JSON.stringify({
        barcode: barcode,
      }),
    })
      .then(res => res.json())
      .then(json => resolve(json))
      .catch(() =>
        resolve({
          status: 404,
          error: 404,
          messages: {
            error: 'Network Error',
          },
        }),
      );
  });
};

const downloadPdf = url => {
  return new Promise(async (resolve, reject) => {
    const header = JSON.parse(await getDataStorage('kunci'));
    let time = new Date();
    RNFetchBlob.config({
      path:
        RNFetchBlob.fs.dirs.DownloadDir +
        '/ACPIGS-Cuti' +
        time.getTime() +
        '.pdf',
    })
      .fetch('GET', url, {
        Authorization: 'Bearer ' + header.token,
      })
      .then(ress => {
        // const android = RNFetchBlob.android;
        // android.actionViewIntent(ress.path(), 'application/pdf');
        resolve(ress.path());
      })
      .catch(() => resolve('Gagal'));
  });
};

const downloadSakit = url => {
  return new Promise(async (resolve, reject) => {
    const header = JSON.parse(await getDataStorage('kunci'));
    let time = new Date();
    RNFetchBlob.config({
      path:
        RNFetchBlob.fs.dirs.DownloadDir +
        '/ACPIGS-Sakit' +
        time.getTime() +
        '.jpg',
    })
      .fetch('GET', url, {
        Authorization: 'Bearer ' + header.token,
      })
      .then(ress => {
        // const android = RNFetchBlob.android;
        // android.actionViewIntent(ress.path(), 'application/pdf');
        resolve(ress.path());
      })
      .catch(() => resolve('Gagal'));
  });
};

const httpGantiPassword = (passwordLama, passwordBaru, passwordBaru1) => {
  return new Promise(async (resolve, reject) => {
    const header = JSON.parse(await getDataStorage('kunci'));
    fetch(`${APP_URL}/gantipassword`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + header.token,
      },
      body: JSON.stringify({
        passwordLama: passwordLama,
        passwordBaru: passwordBaru,
        passwordBaru1: passwordBaru1,
      }),
    })
      .then(res => res.json())
      .then(json => resolve(json))
      .catch(() =>
        resolve({
          status: 404,
          error: 404,
          messages: {
            error: 'Network Error',
          },
        }),
      );
  });
};

export {
  httpLogin,
  formData,
  httpEmail,
  httpLupaPassword,
  httpCode,
  httpProfile,
  httpGantiPhoto,
  httpBarcode,
  httpCuti,
  httpSakit,
  httpIjin,
  httpGaji,
  httpPCuti,
  httpPijin,
  httpPsakit,
  httpYamikuInfo,
  httpAmbilBarcode,
  downloadPdf,
  httpGantiPassword,
  downloadSakit,
};
