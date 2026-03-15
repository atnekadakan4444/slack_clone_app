const baseURL = import.meta.env.VITE_API_URL;

// 共通ヘッダーを生成する
function getHeaders(isJson: boolean = true): HeadersInit {
  const headers: Record<string, string> = {};
  const token = localStorage.getItem("token");
  if (token != null) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  if (isJson) {
    headers["Content-Type"] = "application/json";
  }
  return headers;
}

// レスポンスを処理する
async function handleResponse(response: Response) {
  const data = response.ok ? await response.json().catch(() => null) : null;
  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }
  return { data, status: response.status };
}

const api = {
  async get(path: string, options?: { params?: Record<string, string> }) {
    const url = new URL(`${baseURL}${path}`);
    if (options?.params) {
      Object.entries(options.params).forEach(([key, value]) =>
        url.searchParams.append(key, value),
      );
    }
    const response = await fetch(url.toString(), { headers: getHeaders() });
    return handleResponse(response);
  },

  async post(path: string, body?: unknown) {
    const response = await fetch(`${baseURL}${path}`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(body),
    });
    return handleResponse(response);
  },

  async delete(path: string) {
    const response = await fetch(`${baseURL}${path}`, {
      method: "DELETE",
      headers: getHeaders(),
    });
    return handleResponse(response);
  },

  // FormDataでPOSTする
  async postForm(path: string, data: Record<string, unknown>) {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value != null) formData.append(key, value as Blob | string);
    });
    const response = await fetch(`${baseURL}${path}`, {
      method: "POST",
      headers: getHeaders(false),
      body: formData,
    });
    return handleResponse(response);
  },

  // FormDataでPUTする
  async putForm(path: string, data: Record<string, unknown>) {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value != null) formData.append(key, value as Blob | string);
    });
    const response = await fetch(`${baseURL}${path}`, {
      method: "PUT",
      headers: getHeaders(false),
      body: formData,
    });
    return handleResponse(response);
  },
};

export default api;
