import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";

export default function Index() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [history, setHistory] = useState<
    { input: string; result: string }[]
  >([]);

  // ✅ SAFE evaluator (no mathjs, no crash)
  const evaluateExpression = (expr: string) => {
    try {
      // remove invalid characters for safety
      const clean = expr.replace(/[^0-9+\-*/().]/g, "");
      return Function(`"use strict"; return (${clean})`)();
    } catch {
      return "Error";
    }
  };

  const handlePress = (value: string) => {
    setInput((prev) => prev + value);
  };

  const calculate = () => {
    const res = evaluateExpression(input);

    const resString = String(res);

    setResult(resString);

    setHistory((prev) => [
      {
        input: `${input}\n= ${resString}`,
        result: resString,
      },
      ...prev,
    ]);
  };

  const clear = () => {
    setInput("");
    setResult("");
  };

  const Button = ({ title, onPress }: any) => (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>

      {/* HISTORY */}
      <ScrollView style={styles.historyBox}>
        {history.map((item, index) => (
          <View key={index} style={{ marginBottom: 10 }}>
            <Text style={styles.historyInput}>{item.input}</Text>
          </View>
        ))}
      </ScrollView>

      {/* INPUT */}
      <Text style={styles.input}>{input || "0"}</Text>

      {/* RESULT */}
      <Text style={styles.result}>{result}</Text>

      {/* BUTTONS */}
      <View style={styles.row}>
        <Button title="1" onPress={() => handlePress("1")} />
        <Button title="2" onPress={() => handlePress("2")} />
        <Button title="3" onPress={() => handlePress("3")} />
        <Button title="+" onPress={() => handlePress("+")} />
      </View>

      <View style={styles.row}>
        <Button title="4" onPress={() => handlePress("4")} />
        <Button title="5" onPress={() => handlePress("5")} />
        <Button title="6" onPress={() => handlePress("6")} />
        <Button title="-" onPress={() => handlePress("-")} />
      </View>

      <View style={styles.row}>
        <Button title="7" onPress={() => handlePress("7")} />
        <Button title="8" onPress={() => handlePress("8")} />
        <Button title="9" onPress={() => handlePress("9")} />
        <Button title="*" onPress={() => handlePress("*")} />
      </View>

      <View style={styles.row}>
        <Button title="C" onPress={clear} />
        <Button title="0" onPress={() => handlePress("0")} />
        <Button title="=" onPress={calculate} />
        <Button title="/" onPress={() => handlePress("/")} />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 20,
   
  },

  historyBox: {
    maxHeight: 180,
    marginBottom: 10,
  },

  historyInput: {
    color: "#aaa",
    fontSize: 16,
    textAlign: "right",
  },

  input: {
    color: "#fff",
    fontSize: 40,
    textAlign: "right",
  },

  result: {
    color: "#0f0",
    fontSize: 28,
    textAlign: "right",
    marginBottom: 20,
  },

  row: {
    flexDirection: "row",
  },

  button: {
    flex: 1,
    padding: 20,
    margin: 5,
    backgroundColor: "#333",
    borderRadius: 10,
    alignItems: "center",
  },

  text: {
    color: "#fff",
    fontSize: 20,
  },
});