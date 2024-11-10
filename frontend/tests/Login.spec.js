// tests/Login.spec.js
import { mount } from "@vue/test-utils";
import Login from "@/pages/Login.vue";

describe("Login.vue", () => {
  it("renders the login form", () => {
    const wrapper = mount(Login);
    expect(wrapper.find("h1").text()).toBe("Login");
  });

  it("submits login form with valid credentials", async () => {
    const wrapper = mount(Login);

    // Define os dados para o formulário
    await wrapper.find("#email").setValue("user@example.com");
    await wrapper.find("#password").setValue("password123");

    // Simula o envio do formulário
    await wrapper.find("form").trigger("submit.prevent");

    // Verifique se o login foi bem-sucedido (pode-se verificar uma chamada à API)
    expect(wrapper.emitted()).toHaveProperty("loginSuccess");
  });

  it("shows error message for invalid credentials", async () => {
    const wrapper = mount(Login);

    await wrapper.find("#email").setValue("user@example.com");
    await wrapper.find("#password").setValue("wrongpassword");
    await wrapper.find("form").trigger("submit.prevent");

    // Verifica se a mensagem de erro é exibida
    expect(wrapper.text()).toContain("Credenciais inválidas");
  });
});
