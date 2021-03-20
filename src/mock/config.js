import Mock from "mockjs";

Mock.setup({
  timeout: 300,
});

// Mock the real back-end api structure.
export function interceptor(data) {
  return {
    status: true,
    message: "成功",
    result: data,
  };
}

export const mock = Mock;
